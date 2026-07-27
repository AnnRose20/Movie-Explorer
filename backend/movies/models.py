from django.db import models
from django.contrib.auth.models import User


class Movie(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    overview = models.TextField()
    poster = models.URLField()
    backdrop = models.URLField(blank=True)
    release_date = models.DateField()
    rating = models.FloatField()
    category = models.CharField(
        max_length=20,
        default="popular"
    )

    def __str__(self):
        return self.title


class Favorite(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="favorites",
    )

    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "movie")