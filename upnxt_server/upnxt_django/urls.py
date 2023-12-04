
from django.conf.urls import include
from django.urls import path
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('upnxt.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    # path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls'))
]
