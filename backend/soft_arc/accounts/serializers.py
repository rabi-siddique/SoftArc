from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name','last_name', 'password')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('first_name','last_name','username', 'image','about', 'darktheme')

class ProfilePhotoSerializer(serializers.ModelSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('image',)

class PasswordSerializer(serializers.ModelSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('password',)