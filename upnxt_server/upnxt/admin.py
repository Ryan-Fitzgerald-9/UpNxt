from django.contrib import admin
from .models import CustomUser, Movie, Show, Review

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Movie)
admin.site.register(Show)
admin.site.register(Review)