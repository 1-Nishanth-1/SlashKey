
from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
    
class reportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = report
        fields = ['username', 'latitude', 'longitude', 'desc', 'image', 'is_valid', 'severity']