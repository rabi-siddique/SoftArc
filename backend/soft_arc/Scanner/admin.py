from django.contrib import admin
from Scanner.models import SavedObjects
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models

class ScannerAdminConfig(UserAdmin):
    model = SavedObjects
    search_fields = ('name', 'details',)
    list_filter = ('id','name', 'details')
    ordering = ('id',)
    list_display = ('id','name' ,'details','owner')
    fieldsets = (
        (None, {'fields': ('name', 'details',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('id','name', 'details', 'data')}
         ),
    )

    filter_horizontal = ()



admin.site.register(SavedObjects,ScannerAdminConfig)