from django.db import models
import uuid

# Create your models here.

class missingPerson(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    age = models.IntegerField()
    gender = models.CharField(max_length=1)
    status = models.BooleanField(default=False)
    desc = models.TextField()
    image = models.ImageField(upload_to='static/images/', null=True)

