# Generated by Django 3.1.7 on 2021-05-13 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_auto_20210512_2221'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='fullname',
            new_name='first_name',
        ),
        migrations.AddField(
            model_name='useraccount',
            name='last_name',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
