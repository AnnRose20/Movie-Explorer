from rest_framework import serializers

from .models import Favorite
from .serializers import MovieSerializer


class FavoriteSerializer(serializers.ModelSerializer):

    movie = MovieSerializer(read_only=True)

    class Meta:
        model = Favorite

        fields = [
            "movie",
        ]