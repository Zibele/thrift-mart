from django.db import models
from profiles.models import Profile
from catalog.models import Product

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
    
    class Meta:
        verbose_name_plural = "Order statuses"