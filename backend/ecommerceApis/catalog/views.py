from django.shortcuts import render
from rest_framework import generics
from catalog.models import Product
from catalog.serializers import ProductSerializer

class ProductAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

