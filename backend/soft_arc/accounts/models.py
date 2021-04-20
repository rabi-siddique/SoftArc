from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self,email,fullname,password=None):
        if not email:
            raise ValueError('Users Must have an Email Address')
        
        email = self.normalize_email(email)
        user = self.model(email=email,fullname=fullname)

        #this function creates a hash password
        user.set_password(password)
        #Now we save the user
        user.save()

        return user

    
class UserAccount(AbstractBaseUser,PermissionsMixin):
    #Setting email unique makes it the login key .... by default its username
    email = models.EmailField(max_length=255,unique=True)
    fullname = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()
    #We want the user to login with his email
    USERNAME_FIELD = 'email'
    #Email is by default a required field, so we're setting
    #the fullname field as required field too
    REQUIRED_FIELDS = ['fullname']

    def get_full_name(self):
        return self.fullname
    def get_short_name(self):
        return self.fullname
    def __str__(self):
        return self.email


