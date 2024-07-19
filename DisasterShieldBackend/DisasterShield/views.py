from .models import report, userReputation
from . import utils
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

def inform_authorities():
    pass
    

def create_report(username, latitude, longitude, desc, image, is_valid):

    lat_min, lat_max, lon_min, lon_max = utils.boundingBox(latitude, longitude, 0.5)

    count = report.objects.filter(latitude__gte=lat_min, latitude__lte=lat_max, longitude__gte=lon_min, longitude__lte=lon_max).count()
    
    user = report.objects.filter(username=username).values('username')
    curr_reputation = userReputation.objects.filter(username=user).values('reputation')

    severity_inc = 1
    severity_set = 1

    if curr_reputation <= -10:
        return None
    
    elif curr_reputation >-10 and curr_reputation <= -5:
        severity_inc = 0
        severity_set = 0

    elif curr_reputation <= 0:
        severity_inc = 1
        severity_set = 0
        

    if count >= 1:
        curr_severity = report.objects.filter(username=username).values('severity')
        report.objects.filter(username=username).update(severity = curr_severity+severity_inc)
        if(count + 1 >= 8):
            inform_authorities()
    else:
        report.objects.create(username=username, latitude=latitude, longitude=longitude, desc=desc, image=image, is_valid=is_valid, severity=severity_set)


def verify_report(username, report_id, response):

    curr_severity = report.objects.filter(username=username).values('severity')

    if response == True:
        report.objects.filter(username=username).update(severity = curr_severity+1)
        if(curr_severity + 1 >= 7):
            user = report.objects.filter(username=username).values('username')
            curr_reputation = userReputation.objects.filter(username=user).values('reputation')
            userReputation.objects.filter(username=user).update(reputation = curr_reputation+1)
            inform_authorities()
    else:
        report.objects.filter(username=username).update(severity = curr_severity-1)
        if(report.objects.filter(username=username).values('severity') <= -2):
            user = report.objects.filter(username=username).values('username')
            curr_reputation = userReputation.objects.filter(username=user).values('reputation')
            userReputation.objects.filter(username=user).update(reputation = curr_reputation-1)
            report.objects.filter(username=username).delete()
            
