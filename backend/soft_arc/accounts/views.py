from .serializers import ProfileSerializer
from .models import UserAccount
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions


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
