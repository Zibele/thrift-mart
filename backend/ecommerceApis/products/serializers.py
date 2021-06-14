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
    image = serializers.ImageField(use_url=True)
    product_type = ProductTypeSerializer(read_only=True,source = "ProductType.category")
    class Meta:
        model = Product
        fields = "__all__"
    
