from django.db import models
import uuid

# Create your models here.

class userReputation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    reputation = models.IntegerField(default=0)

class missingPerson(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    age = models.IntegerField()
    gender = models.CharField(max_length=1)
    status = models.BooleanField(default=False)
    desc = models.TextField()
    image = models.ImageField(upload_to='static/images/', null=True)

class report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    latitude = models.FloatField()
    longitude = models.FloatField()
    desc = models.TextField()
    image = models.ImageField(upload_to='static/images/', null=True)
    is_valid = models.BooleanField(default=True)
    severity = models.IntegerField(default=1)

class Blood_donation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.ForeignKey('auth.User',on_delete=models.CASCADE)
    priority = models.BooleanField(default=False)
    patient_name = models.CharField(max_length=25)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    blood_type = models.CharField(max_length=3)
    contact_number = models.CharField(max_length=15)
    age = models.IntegerField()
    gender = models.CharField(max_length=1)
    is_valid = models.BooleanField(default=True)


