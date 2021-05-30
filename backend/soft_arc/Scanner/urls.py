from django.urls import path, include, re_path
from django.views.generic import TemplateView
from Scanner import views

urlpatterns = [
    path('upload/<int:pk>/',views.UploadView.as_view(),name="uploaddata"),
    path('saved/<int:pk>/',views.UserDataView.as_view(),name="getdata"),
    path('save/',views.UserDataView.as_view(),name="postdata"),
    path('update/<int:pk>/',views.UserDataView.as_view(),name="updatedata"),
    path('delete/<int:pk>/',views.UserDataView.as_view(),name="deletedata"),
    path('download/',views.PDFView.as_view(),name="downloadpdf"),
    path('share/',views.ShareView.as_view(),name="sharepdf"),
]

