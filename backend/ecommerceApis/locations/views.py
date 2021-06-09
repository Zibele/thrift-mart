from django.shortcuts import render
from rest_framework import generics
from locations.models import Address
from locations.serializers import AddressSerializer


class AddressAPIView(generics.ListCreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


