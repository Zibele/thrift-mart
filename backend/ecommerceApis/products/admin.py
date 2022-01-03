from django.contrib import admin
from .models import Product,ProductGenderCategory,ProductType,Size,Colour,Brand

productModels = [Product,ProductGenderCategory,ProductType,Size,Colour,Brand]

admin.site.register(productModels)
