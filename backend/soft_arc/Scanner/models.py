from django.db import models
from jsonfield import JSONField
from django.contrib.auth import get_user_model
User = get_user_model()


class SavedObjects(models.Model):
    name = models.CharField(max_length=100)
    details = models.CharField(max_length=255)
    data = JSONField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
            return self.data

    objects = models.Manager()

    
    