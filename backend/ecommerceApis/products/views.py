from django.shortcuts import render
from rest_framework import generics
from products.models import Product,ProductType,Brand,Colour,Size
from products.serializers import ProductSerializer,ProductTypeSerializer,ProductBrandSerializer,ProductSizeSerializer,ProductColourSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework.filters import OrderingFilter


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['brand','colour','size']    


class ProductAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all().select_related("product_type")
    serializer_class = ProductSerializer
    filter_backends = (filters.DjangoFilterBackend,OrderingFilter,)
    ordering_fields= ['price','date_posted']
    filterset_class = ProductFilter

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
    filter_backends = [DjangoFilterBackend]
    filterset_fields= ['id','size']


