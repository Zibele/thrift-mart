from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
from django.contrib.auth.models import User

class Role(models.Model):
    
    ADMIN = 1
    REVIEWER = 2
    BUYER = 3
    SELLER = 4
    
    ROLE_CHOICES = (
        (BUYER, "buyer"),
        (SELLER, "seller"),
        (ADMIN, "admin"),
        (REVIEWER, "reviewer")
    )

    id = models.PositiveSmallIntegerField(choices = ROLE_CHOICES,primary_key = True)

    def __str__(self):
        return self.get_id_display()

class Country(models.Model):

    SOUTH_AFRICA = 1
    OTHER = 2

    COUNTRY_CHOICES = ( 
        (SOUTH_AFRICA, "South Africa"),
        (OTHER,"Other")
    )

    id = models.PositiveSmallIntegerField(choices=(COUNTRY_CHOICES),primary_key=True)

    def __str__(self):
        return self.get_id_display()


class Address(models.Model):
    country = models.ForeignKey(Country, on_delete = models.SET_NULL, null = True)
    address = models.TextField()
    
    def __str__(self):
        return f"{address},{country}" 

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    address = models.ForeignKey(Address, on_delete = models.SET_NULL , null=True)
    roles = models.ManyToManyField(Role)
    email = models.EmailField()

    def __str__(self):
        return self.user.username
   
   
class ProductType(models.Model):
    TOP = 1
    BOTTOM = 2
    DRESS = 3
    FOOT_WEAR = 4
    OUT_WEAR = 5

    CHOICES = ( 
        (TOP,"Tops"),
        (BOTTOM, "Bottoms"),
        (DRESS, "Dresses"),
        (FOOT_WEAR, "Foot wear"),
        (OUT_WEAR, "Out Wear")
        )
    
    id = models.PositiveSmallIntegerField(choices = CHOICES,primary_key=True)
    
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

    def __str__(self):
        return self.get_id_display()


class Product(models.Model):
    profile = models.ForeignKey(Profile,on_delete = models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField(80)
    product_type = models.ForeignKey(ProductType, on_delete = models.SET_NULL, null = True)
    gender_category = models.ForeignKey(ProductGenderCategory, on_delete = models.SET_NULL, null = True)
    price = models.DecimalField(max_digits = 7, decimal_places = 2,validators = [MinValueValidator(0.01),MaxValueValidator(10000.00)])
    quantity_in_stock = models.PositiveIntegerField(default = 0, validators = [MinValueValidator(0)])
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - R {self.price}"




class Order(models.Model):
    user = models.ForeignKey(Profile,on_delete = models.CASCADE)
    products = models.ManyToManyField(Product)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return self.products.title



class OrderStatus(models.Model):

    DELIVERY_PENDING = 1
    DELIVERED = 2
    ORDER_CANCELLED = 3

    ORDER_STATUS = ( 
        (DELIVERY_PENDING, "Delivery is pending"),
        (DELIVERED, "Delivered"),
        (ORDER_CANCELLED,"Cancelled"),
    )

    id = models.PositiveSmallIntegerField(choices = ORDER_STATUS, primary_key = True ) 

    def __str__(self):
        return self.get_id_display()


