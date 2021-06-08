from django.contrib import admin
from .models import Order,OrderStatus

orderModels = [Order,OrderStatus]

admin.site.register(orderModels)
