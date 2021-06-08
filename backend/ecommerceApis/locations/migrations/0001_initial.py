# Generated by Django 3.2.3 on 2021-06-08 21:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.PositiveSmallIntegerField(choices=[(1, 'South Africa'), (2, 'Other')], primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.TextField()),
                ('country', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='locations.country')),
            ],
        ),
    ]