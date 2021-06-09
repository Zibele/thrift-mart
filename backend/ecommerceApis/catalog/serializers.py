from rest_framework import serializers
from catalog.models import ProductType,ProductGenderCategory,Product

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = "__all__"

class ProductGenderCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGenderCategory
        fields = "__all__"

class ProductSerializer(serializer.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"