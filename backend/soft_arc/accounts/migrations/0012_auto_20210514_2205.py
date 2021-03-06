# Generated by Django 3.1.7 on 2021-05-14 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_auto_20210514_2154'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='about',
            field=models.CharField(default='Please Complete this Section', max_length=255),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='darktheme',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='image',
            field=models.ImageField(default='images/default.png', upload_to='images', verbose_name='Image'),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='username',
            field=models.CharField(default='user27', max_length=255),
        ),
    ]
