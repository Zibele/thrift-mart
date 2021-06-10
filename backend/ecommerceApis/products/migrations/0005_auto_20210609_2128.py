# Generated by Django 3.2.3 on 2021-06-09 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_auto_20210608_2225'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='productgendercategory',
            options={'verbose_name_plural': 'Product gender categories'},
        ),
        migrations.AlterField(
            model_name='producttype',
            name='id',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Tops'), (2, 'Bottoms'), (3, 'Dresses'), (4, 'Footwear'), (5, 'Outwear')], primary_key=True, serialize=False),
        ),
    ]