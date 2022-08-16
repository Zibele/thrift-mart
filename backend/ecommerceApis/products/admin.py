from django.contrib import admin
from .models import Product,Gender,ProductType,Size,Colour,Brand

productModels = [Product,Gender,ProductType,Size,Colour,Brand]

admin.site.register(productModels)
