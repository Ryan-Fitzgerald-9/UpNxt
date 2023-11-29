from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

class Movie(models.Model):
    title = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    release_date = models.CharField(max_length=100)
    length_in_mins = models.CharField(max_length=100)
    image_url = models.CharField(max_length=200, null=True, default='tmdb')
    director = models.CharField(max_length=100)
    actors = models.CharField(max_length=100)
    available_on = models.CharField(max_length=100, default = 'enter streaming app')
    imdb_score = models.DecimalField(max_digits=3, decimal_places=1)
    overview = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Show(models.Model):
    title = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    release_date = models.CharField(max_length=100)
    seasons = models.CharField(max_length=100)
    image_url = models.CharField(max_length=200, null=True, default='tmdb')
    director = models.CharField(max_length=100)
    actors = models.CharField(max_length=100)
    available_on = models.CharField(max_length=100, default = 'enter streaming app')
    imdb_score = models.DecimalField(max_digits=3, decimal_places=1)
    overview = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reviews')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)
    show = models.ForeignKey(Show, on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)
    title = models.CharField(max_length=100)
    user_score = models.DecimalField(max_digits=3, decimal_places=1)
    user_review = models.CharField(max_length=200)

    class Meta:
        unique_together = ['user', 'movie', 'show']

    def __str__(self):
        return self.title