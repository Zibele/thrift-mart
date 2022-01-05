from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
from django.db.models.fields import CharField
from profiles.models import Profile
from django.utils import timezone
import uuid
from django.core.files.storage import FileSystemStorage
from django.conf import settings

class ProductType(models.Model):
    JACKETS = 1
    SHIRTS = 2
    CHOICES = ( 
        (JACKETS,"Jackets"),
        (SHIRTS,"Shirts")
        )
    
    id = models.PositiveSmallIntegerField(choices = CHOICES,primary_key=True)
    category = models.CharField(max_length=20,default="Jackets")
    def __str__(self):
        return str(self.get_id_display())
    


class ProductGenderCategory(models.Model):
    MEN = 1
    WOMEN = 2
   
    CHOICES = (
        (MEN,"Men"),
        (WOMEN,"Women"),
        )

    id = models.PositiveSmallIntegerField(choices = CHOICES, primary_key = True)
    category = models.CharField(max_length=20)

    def __str__(self):
        return self.get_id_display()
    
    class Meta:
        verbose_name_plural = "Product Gender Categories"




class Brand(models.Model):

    brand = models.CharField(max_length=50)

    def __str__(self):
        return self.brand

class Colour(models.Model):

    colour = models.CharField(max_length=50)

    def __str__(self):
        return self.colour

class Size(models.Model):
    
    size =  models.CharField(max_length=50)

    def __str__(self):
        return self.size       


def product_directory_path(instance,filename):
    return "products/{0}/{1}".format(instance.id,filename)

def product_storage_path():
    image_storage = FileSystemStorage(
    # Physical file location ROOT
    location=u'{0}/products/'.format(settings.MEDIA_ROOT),
    # Url for file
    base_url=u'{0}products/'.format(settings.MEDIA_URL),
    )

    return image_storage


class Product(models.Model):

    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    profile = models.ForeignKey(Profile,on_delete = models.CASCADE)
    primary_image = models.ImageField(upload_to=product_directory_path,storage = product_storage_path,default="default.jpg")
    secondary_image = models.ImageField(upload_to=product_directory_path, storage = product_storage_path,default="default.jpg")
    title = models.CharField(max_length=100)
    brand = models.ForeignKey(Brand,on_delete = models.SET_NULL, null = True)
    colour = models.ForeignKey(Colour,on_delete = models.SET_NULL, null = True)
    size = models.ForeignKey(Size, on_delete = models.SET_NULL, null = True)
    product_type = models.ForeignKey(ProductType, on_delete = models.SET_NULL, null = True)
    gender_category = models.ForeignKey(ProductGenderCategory, on_delete = models.SET_NULL, null = True)
    price = models.DecimalField(max_digits = 7, decimal_places = 2,validators = [MinValueValidator(0.01),MaxValueValidator(10000.00)])
    quantity_in_stock = models.PositiveIntegerField(default = 0, validators = [MinValueValidator(0)])
    date_posted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.title} - R {self.price}"



