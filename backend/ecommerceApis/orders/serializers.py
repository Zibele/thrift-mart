from rest_framework import serializers
from orders.models import Order,OrderStatus

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        mode = OrderStatus
        fields = "__all__"



