# Generated by Django 3.1.7 on 2021-05-10 08:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20210510_1351'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='profile_pic',
            new_name='image',
        ),
    ]
