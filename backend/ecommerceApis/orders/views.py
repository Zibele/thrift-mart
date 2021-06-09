from django.shortcuts import render
from rest_framework import generics
from orders.models import Order
from orders.serializers import OrderSerializer

class OrderAPIView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer



