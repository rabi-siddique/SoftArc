from django.contrib import admin
from django.urls import path
from accounts import views


urlpatterns = [
    path('setpass/<int:pk>/',views.PasswordView.as_view()),
    path('get/<int:pk>/',views.ProfileView.as_view()),
    path('update/<int:pk>/',views.ProfileView.as_view()),
    path('updatedp/<int:pk>/',views.ProfilePhotoView.as_view()),
    path('getdp/<int:pk>/',views.ProfilePhotoView.as_view()),
]

