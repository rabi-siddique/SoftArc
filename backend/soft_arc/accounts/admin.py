from django.contrib import admin
from accounts.models import UserAccount
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    model = UserAccount
    search_fields = ('email', 'first_name','last_name',)
    list_filter = ('email', 'first_name','last_name', 'is_active', 'is_staff')
    ordering = ('id',)
    list_display = ('id','email' ,'first_name','last_name','username','image','password',
    'about','darktheme','is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'first_name','last_name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('password',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name','last_name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(UserAccount, UserAdminConfig)