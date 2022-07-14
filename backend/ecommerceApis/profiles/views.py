from django.shortcuts import render
from rest_framework import generics
from profiles.models import Profile
from profiles.serializers import ProfileSerializer

class ProfileAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class= ProfileSerializer

    