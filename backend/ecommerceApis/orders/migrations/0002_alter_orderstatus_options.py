# Generated by Django 3.2.3 on 2021-06-09 19:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='orderstatus',
            options={'verbose_name_plural': 'Order statuses'},
        ),
    ]
