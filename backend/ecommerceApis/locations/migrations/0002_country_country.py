# Generated by Django 3.2.3 on 2022-08-16 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='country',
            name='country',
            field=models.CharField(default='South Africa', max_length=30),
        ),
    ]
