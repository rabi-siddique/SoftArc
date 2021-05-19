from django.contrib import admin
from django.urls import path
from accounts import views


urlpatterns = [
    path('get/<int:pk>/',views.ProfileView.as_view()),
    path('update/<int:pk>/',views.ProfileView.as_view()),
]

