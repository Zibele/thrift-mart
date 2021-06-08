from django.contrib import admin
from .models import Address,Country

locationModels = [Address,Country]

admin.site.register(locationModels)
