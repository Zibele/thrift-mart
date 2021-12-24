from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
from profiles.models import Profile
import uuid

class ProductType(models.Model):
    TOP = 1
    BOTTOM = 2
    DRESS = 3
    FOOT_WEAR = 4
    OUT_WEAR = 5
    OTHER = 6
    CHOICES = ( 
        (TOP,"Tops"),
        (BOTTOM, "Bottoms"),
        (DRESS, "Dresses"),
        (FOOT_WEAR, "Footwear"),
        (OUT_WEAR, "Outwear"),
        (OTHER,"Other")
        )
    
    id = models.PositiveSmallIntegerField(choices = CHOICES,primary_key=True)
    category = models.CharField(max_length=20,default="Tops")
    def __str__(self):
        return self.get_id_display()
    


class ProductGenderCategory(models.Model):
    MALE = 1
    FEMALE = 2
    UNISEX = 3

    CHOICES = (
        (MALE,"Male"),
        (FEMALE,"Female"),
        (UNISEX,"Unisex"),
        )

    id = models.PositiveSmallIntegerField(choices = CHOICES, primary_key = True)
    category = models.CharField(max_length=20)

    def __str__(self):
        return self.get_id_display()
    
    class Meta:
        verbose_name_plural = "Product gender categories"


def product_directory_path(instance,filename):
    return "products/{0}/{1}".format(instance.id,filename)


class Product(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    profile = models.ForeignKey(Profile,on_delete = models.CASCADE)
    image = models.ImageField(upload_to=product_directory_path,default="default.jpg")
    title = models.CharField(max_length=50)
    description = models.TextField(80)
    product_type = models.ForeignKey(ProductType, on_delete = models.SET_NULL, null = True)
    gender_category = models.ForeignKey(ProductGenderCategory, on_delete = models.SET_NULL, null = True)
    price = models.DecimalField(max_digits = 7, decimal_places = 2,validators = [MinValueValidator(0.01),MaxValueValidator(10000.00)])
    quantity_in_stock = models.PositiveIntegerField(default = 0, validators = [MinValueValidator(0)])
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - R {self.price}"