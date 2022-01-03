from rest_framework import serializers
from products.models import ProductType,ProductGenderCategory,Product
import base64,os

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = "__all__"

class ProductGenderCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGenderCategory
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    primary_image = serializers.ImageField(use_url=True)
    secondary_image = serializers.ImageField(use_url=True)
    class Meta:
        model = Product
        fields = "__all__"
        depth=1
    
