from rest_framework import serializers
from Scanner.models import SavedObjects

class SavedObjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedObjects
        fields = ('id','name','details','data','owner')

class EditSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedObjects
        fields = ('name','details')