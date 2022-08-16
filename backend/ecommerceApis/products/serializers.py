
from rest_framework import serializers
from products.models import ProductType,Gender,Product,Brand,Size,Colour
import base64,os

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = "__all__"

class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = "__all__"

class ProductBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"

class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = "__all__"

class ProductColourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colour
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    primary_image = serializers.ImageField(use_url=True)
    secondary_image = serializers.ImageField(use_url=True)
    class Meta:
        model = Product
        fields = "__all__"
        depth=1
    
