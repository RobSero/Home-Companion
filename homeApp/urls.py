from django.contrib import admin 
from django.urls import path, include
 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/location/', include('location.urls')),
    path('api/task/', include('tasks.urls'))
]
