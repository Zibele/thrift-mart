# Generated by Django 3.2.3 on 2021-06-08 11:08

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.PositiveSmallIntegerField(choices=[(1, 'South Africa'), (2, 'Other')], primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='OrderStatus',
            fields=[
                ('id', models.PositiveSmallIntegerField(choices=[(1, 'Delivery is pending'), (2, 'Delivered'), (3, 'Cancelled')], primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='ProductGenderCategory',
            fields=[
                ('id', models.PositiveSmallIntegerField(choices=[(1, 'Male'), (2, 'Female'), (3, 'Unisex')], primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='ProductType',
            fields=[
                ('id', models.PositiveSmallIntegerField(choices=[(1, 'Tops'), (2, 'Bottoms'), (3, 'Dresses'), (4, 'Foot wear'), (5, 'Out Wear')], primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.PositiveSmallIntegerField(choices=[(3, 'buyer'), (4, 'seller'), (1, 'admin'), (2, 'reviewer')], primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('address', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.address')),
                ('roles', models.ManyToManyField(to='products.Role')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField(verbose_name=80)),
                ('price', models.PositiveIntegerField(default=50, validators=[django.core.validators.MinValueValidator(50), django.core.validators.MaxValueValidator(1000)])),
                ('quantity_in_stock', models.BooleanField(default=False)),
                ('date_posted', models.DateTimeField(auto_now_add=True)),
                ('gender_category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.productgendercategory')),
                ('product_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.producttype')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('products', models.ManyToManyField(to='products.Product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.profile')),
            ],
        ),
        migrations.AddField(
            model_name='address',
            name='country',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.country'),
        ),
    ]
