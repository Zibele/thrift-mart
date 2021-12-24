from django.shortcuts import render
from rest_framework import generics
from products.models import Product,ProductType
from products.serializers import ProductSerializer,ProductTypeSerializer

class ProductAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all().select_related("product_type")
    serializer_class = ProductSerializer

class ProductTypeAPIView(generics.ListCreateAPIView):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer