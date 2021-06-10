from django.shortcuts import render
from rest_framework import generics
from products.models import Product
from products.serializers import ProductSerializer

class ProductAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

