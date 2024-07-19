from .models import report, userReputation
from . import utils
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from django.http import HttpResponse

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

def inform_authorities():
    # Send a notification to the authorities
    pass

@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def create_report(request):
    if request.method == 'POST':
        data = request.data

        latitude = data.get('latitude')
        longitude = data.get('longitude')
        
        try:
            lat_min, lat_max, lon_min, lon_max = utils.boundingBox(latitude, longitude, 0.5)
        except ValueError as e:
            return Response({'error': f'Error unpacking bounding box coordinates: {e}'}, status=status.HTTP_400_BAD_REQUEST)

        # reports = report.objects.filter(latitude__gte=lat_min, latitude__lte=lat_max, longitude__gte=lon_min, longitude__lte=lon_max)
        reports = report.objects.filter(latitude = latitude, longitude = longitude)
        curr_location = (latitude, longitude)

        try:
            curr_reputation = userReputation.objects.get(username=data.get('username')).reputation
            print(curr_reputation)
        except userReputation.DoesNotExist:
            curr_reputation = 0

        severity_inc = 1
        severity_set = 1

        if curr_reputation <= -10:
            return Response({'error': 'User reputation too low to create a report'}, status=status.HTTP_403_FORBIDDEN)
        elif curr_reputation > -10 and curr_reputation <= -5:
            severity_inc = 0
            severity_set = 0
        elif curr_reputation <= 0:
            severity_inc = 1
            severity_set = 0

        if reports.exists():
            curr_severity = reports.first().severity
            reports.update(severity=curr_severity + severity_inc)
            if curr_severity + severity_inc >= 7:
                inform_authorities()
            
            serializer = reportsSerializer(reports, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            # return Response({'message': 'Report updated successfully'}, status=status.HTTP_200_OK)
            
        else:
            data['severity'] = severity_set
            print(data['severity'])
            serializer = reportsSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Error creating report:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'GET':
        reports = report.objects.all()
        serializer = reportsSerializer(reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


def verify_report(request):

    data = request.data

    response = data.get('response')
    uname = data.get('username')
    report_id = data.get('id')


    curr_severity = report.objects.filter(username=uname).values('severity')

    if response == True:
        report.objects.filter(username=uname).update(severity = curr_severity+1)
        if(curr_severity + 1 >= 7):
            user = report.objects.filter(username=uname).values('username')
            curr_reputation = userReputation.objects.filter(username=user).values('reputation')
            userReputation.objects.filter(username=user).update(reputation = curr_reputation+1)
            inform_authorities()
    else:
        report.objects.filter(username=uname).update(severity = curr_severity-1)
        if(report.objects.filter(username=uname).values('severity') <= -2):
            user = report.objects.filter(username=uname).values('username')
            curr_reputation = userReputation.objects.filter(username=user).values('reputation')
            userReputation.objects.filter(username=user).update(reputation = curr_reputation-1)
            report.objects.filter(username=uname).delete()


@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def blood_donation(request):
    if(request.method == 'GET'):
        data = request.data
        serializer = bloodDonationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)