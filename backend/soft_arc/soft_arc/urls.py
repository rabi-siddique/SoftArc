from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin', admin.site.urls),
    path('profile/',include('accounts.urls')),
    path('scanner/',include('Scanner.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/',  include('djoser.social.urls')),
]


if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
