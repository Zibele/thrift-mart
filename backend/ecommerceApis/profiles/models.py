from django.db import models
from django.contrib.auth.models import User
from locations.models import Address

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


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    address = models.ForeignKey(Address, on_delete = models.SET_NULL , null=True)
    roles = models.ManyToManyField(Role)
    email = models.EmailField()

    def __str__(self):
        return self.user.username
