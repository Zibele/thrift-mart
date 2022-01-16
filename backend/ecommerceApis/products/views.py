from django.shortcuts import render
from rest_framework import generics
from products.models import Product,ProductType,Brand,Colour,Size
from products.serializers import ProductSerializer,ProductTypeSerializer,ProductBrandSerializer,ProductSizeSerializer,ProductColourSerializer

class ProductAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all().select_related("product_type")
    serializer_class = ProductSerializer

class ProductTypeAPIView(generics.ListCreateAPIView):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer

class BrandAPIView(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class= ProductBrandSerializer

class ColourAPIView(generics.ListCreateAPIView):
    queryset = Colour.objects.all()
    serializer_class= ProductColourSerializer

class SizeAPIView(generics.ListCreateAPIView):
    queryset = Size.objects.all()
    serializer_class=ProductSizeSerializer