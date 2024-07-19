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
    
@api_view(['POST'])
@permission_classes([AllowAny])
def create_report(request):
    serializer = reportsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Error creating report:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)