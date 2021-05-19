from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,BaseUserManager
from django.utils.translation import gettext_lazy as _

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)


class UserAccountManager(BaseUserManager):
    def create_user(self,email,first_name,last_name,password=None):
        if not email:
            raise ValueError('Users Must have an Email Address')
        
        email = self.normalize_email(email)
        user = self.model(email=email,first_name=first_name,last_name=last_name)

        #this function creates a hash password
        user.set_password(password)
        #Now we save the user
        user.save()

        return user

    def create_superuser(self, email, first_name,last_name, password=None):
        user = self.create_user(email,first_name,last_name,password)
        user.is_superuser = True
        user.is_staff = True
        user.save()


    
class UserAccount(AbstractBaseUser,PermissionsMixin):
    #Setting email unique makes it the login key .... by default its username
    email = models.EmailField(max_length=255,unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255,null=True)

    username = models.CharField(max_length=255,default="user27")
    about = models.CharField(max_length=255,default="Please Complete this Section")
    darktheme = models.BooleanField(default=False)
    image = models.ImageField(
        _("Image"), upload_to='images')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()
    #We want the user to login with his email
    USERNAME_FIELD = 'email'
    #Email is by default a required field, so we're setting
    #the fullname field as required field too
    REQUIRED_FIELDS = ['first_name','last_name']

    def get_full_name(self):
        return self.first_name+" "+self.last_name
    def get_short_name(self):
        return self.first_name
    def __str__(self):
        return self.email


