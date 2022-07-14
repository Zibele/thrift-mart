from django.contrib import admin
from .models import Profile,Role

profileModels = [Profile,Role]

admin.site.register(profileModels)


