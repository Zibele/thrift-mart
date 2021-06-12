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

    class Meta:
        model = Product
        fields = "__all__"
    
    def to_representation(self,instance):
         
        return {
            'image':self.encode_image(instance.image),
            'title':instance.title
        }

    def encode_image(self,image_field):
        if image_field == '':
            return 'None'

        image_path = os.path.normpath(str(image_field))
        with open(image_path,"rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        
        return encoded_string
