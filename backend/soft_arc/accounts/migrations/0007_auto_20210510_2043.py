# Generated by Django 3.1.7 on 2021-05-10 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20210510_1357'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='image',
            field=models.ImageField(default='images/default.png', upload_to='images', verbose_name='Image'),
        ),
    ]
