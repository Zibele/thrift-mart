from django.db import models

class Country(models.Model):

    SOUTH_AFRICA = 1
    OTHER = 2

    COUNTRY_CHOICES = ( 
        (SOUTH_AFRICA, "South Africa"),
        (OTHER,"Other")
    )

    id = models.PositiveSmallIntegerField(choices=(COUNTRY_CHOICES),primary_key=True)
    country = models.CharField(max_length=30,default="South Africa")

    def __str__(self):
        return self.get_id_display()

    class Meta:
        verbose_name_plural = "Countries"


class Address(models.Model):
    country = models.ForeignKey(Country, on_delete = models.SET_NULL, null = True)
    address = models.TextField()
    
    def __str__(self):
        return f"{self.address},{self.country}" 

    class Meta:
        verbose_name_plural = "Addresses"
