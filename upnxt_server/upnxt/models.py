from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100, default='enter username')
    email = models.CharField(max_length=100, default='enter user email')

    def __str__(self):
        return self.username

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.CharField(max_length=100)
    length_in_mins = models.CharField(max_length=100)
    image_url = models.CharField(max_length=200, null=True)
    director = models.CharField(max_length=100)
    actors = models.CharField(max_length=100)
    available_on = models.CharField(max_length=100, default = 'enter streaming app')
    imdb_score = models.IntegerField()
    overview = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Show(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.CharField(max_length=100)
    seasons = models.CharField(max_length=100)
    image_url = models.CharField(max_length=200, null=True)
    director = models.CharField(max_length=100)
    actors = models.CharField(max_length=100)
    available_on = models.CharField(max_length=100, default = 'enter streaming app')
    imdb_score = models.IntegerField()
    overview = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    show = models.ForeignKey(Show, on_delete=models.CASCADE, related_name='reviews')
    user_score = models.IntegerField()
    user_review = models.CharField(max_length=200)