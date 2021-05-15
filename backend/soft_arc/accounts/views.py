from django.shortcuts import render
from .serializers import ProfileSerializer,ProfilePhotoSerializer,PasswordSerializer
from rest_framework import generics,status
from .models import UserAccount
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import authentication, permissions
from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import MultiPartParser,FormParser
from django.conf import settings

class ProfileView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, pk, format=None):
        profiledata = UserAccount.objects.get(pk=pk)
        serializer = ProfileSerializer(profiledata)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        profiledata = UserAccount.objects.get(pk=pk)
        serializer = ProfileSerializer(profiledata,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Partial Data Updated'})
        return Response(serializer.errors)

class ProfilePhotoView(APIView):
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser,FormParser]

    def get(self, request, pk, format=None):
        img = UserAccount.objects.filter(pk=pk,file_type='image')
        return Response({"img":img, 'media_url':settings.MEDIA_URL})

        #image = UserAccount.objects.get(pk=pk)
        #serializer = ProfilePhotoSerializer(image)
        #return Response(serializer.data)

    def patch(self, request, pk, format=None):
        print(request.data)
        data = UserAccount.objects.get(pk=pk)
        serializer = ProfileSerializer(data,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Partial Data Updated'})
        return Response(serializer.errors)
 

class PasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk, format=None):
        password = UserAccount.objects.get(pk=pk)
        serializer = PasswordSerializer(password)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        newpass = UserAccount.objects.get(pk=pk)
        serializer = PasswordSerializer(newpass,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Partial Data Updated'})
        return Response(serializer.errors)
