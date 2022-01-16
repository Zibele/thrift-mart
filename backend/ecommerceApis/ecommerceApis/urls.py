"""ecommerceApis URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from products.views import ProductAPIView,ProductTypeAPIView,BrandAPIView,ColourAPIView,SizeAPIView
from orders.views import OrderAPIView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products',ProductAPIView.as_view(), name = "product-list" ),
    path('api/orders',OrderAPIView.as_view(), name = "order-list"),
    path('api/productTypes',ProductTypeAPIView.as_view(), name="product-type-list"),
    path('api/brands',BrandAPIView.as_view(), name = "brand-list"),
    path('api/colours',ColourAPIView.as_view(), name = "colour-list"),
    path('api/sizes',SizeAPIView.as_view(), name="size-list")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
