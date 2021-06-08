from django.contrib import admin
from .models import Product,ProductGenderCategory,ProductType

productModels = [Product,ProductGenderCategory,ProductType]

admin.site.register(productModels)
