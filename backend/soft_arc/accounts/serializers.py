from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'fullname', 'password')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('fullname','username', 'image','about', 'darktheme')

class ProfilePhotoSerializer(serializers.ModelSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('image',)

class PasswordSerializer(serializers.ModelSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('password',)