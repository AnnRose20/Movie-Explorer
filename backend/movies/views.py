from django.db.models import Q
from django.core.paginator import Paginator
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
import urllib.request
from django.conf import settings

from .models import Movie
from .serializers import MovieSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from .models import Favorite
from .serializers_favorite import FavoriteSerializer


@api_view(["GET"])
def movie_list(request):

    page = request.GET.get("page", 1)

    movies = Movie.objects.all()

    paginator = Paginator(movies, 20)

    page_obj = paginator.get_page(page)

    serializer = MovieSerializer(
        page_obj,
        many=True
    )

    return Response({

        "count": paginator.count,

        "total_pages": paginator.num_pages,

        "current_page": page_obj.number,

        "results": serializer.data

    })



@api_view(["GET"])
def movie_detail(request, id):

    try:
        db_movie = Movie.objects.get(id=id)

    except Movie.DoesNotExist:
        return Response(
            {"error": "Movie not found"},
            status=404
        )

    API_KEY = settings.TMDB_API_KEY

    url = (
        f"https://api.themoviedb.org/3/movie/{db_movie.tmdb_id}"
        f"?api_key={API_KEY}"
    )

    try:

        request_tmdb = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        with urllib.request.urlopen(request_tmdb) as response:

            data = json.loads(response.read().decode())

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=500
        )

    return Response(data)


@api_view(["GET"])
def recommended_movies(request, id):

    API_KEY = settings.TMDB_API_KEY

    try:
        # Get movie from your database
        db_movie = Movie.objects.get(id=id)

    except Movie.DoesNotExist:

        return Response(
            {"error": "Movie not found"},
            status=404
        )

    url = (
        f"https://api.themoviedb.org/3/movie/{db_movie.tmdb_id}/recommendations"
        f"?api_key={API_KEY}"
    )

    try:

        print(url)
        request_tmdb = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        with urllib.request.urlopen(request_tmdb, timeout=20) as response:

            data = json.loads(response.read().decode())

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=500
        )

    movies = []

    for movie in data["results"][:12]:

        movies.append({

            "id": movie["id"],

            "title": movie["title"],

            "overview": movie["overview"],

            "poster_path": movie["poster_path"],

            "backdrop_path": movie["backdrop_path"],

            "release_date": movie["release_date"],

            "vote_average": movie["vote_average"],

        })

    return Response(movies)


@api_view(["GET"])
def search_movies(request):

    query = request.GET.get("q", "")

    movies = Movie.objects.filter(
        Q(title__icontains=query) |
        Q(overview__icontains=query)
    )

    serializer = MovieSerializer(
        movies,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def top_rated_movies(request):

    movies = Movie.objects.filter(
        category="top_rated"
    )

    serializer = MovieSerializer(
        movies,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def upcoming_movies(request):

    movies = Movie.objects.filter(
        category="upcoming"
    )

    serializer = MovieSerializer(
        movies,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def movie_trailer(request, id):

    API_KEY = settings.TMDB_API_KEY

    try:
        db_movie = Movie.objects.get(id=id)

    except Movie.DoesNotExist:

        return Response(
            {"error": "Movie not found"},
            status=404
        )

    url = (
        f"https://api.themoviedb.org/3/movie/"
        f"{db_movie.tmdb_id}/videos"
        f"?api_key={API_KEY}"
    )

    try:

        request_tmdb = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        with urllib.request.urlopen(request_tmdb) as response:

            data = json.loads(response.read().decode())

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=500
        )

    trailer = None

    for video in data["results"]:

        if (
            video["site"] == "YouTube"
            and video["type"] == "Trailer"
        ):
            trailer = video
            break

    if trailer is None:

        return Response(
            {"error": "Trailer not found"},
            status=404
        )

    return Response({
        "name": trailer["name"],
        "key": trailer["key"]
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_favorite(request):

    movie_id = request.data.get("movie_id")

    print("Received movie_id:", movie_id)

    print(
        Movie.objects.filter(
            tmdb_id=movie_id
        ).values(
            "id",
            "tmdb_id",
            "title",
        )
    )

    try:
        movie = Movie.objects.get(id=movie_id)

    except Movie.DoesNotExist:

        return Response(
            {"error": "Movie not found"},
            status=404,
        )

    favorite, created = Favorite.objects.get_or_create(

        user=request.user,

        movie=movie,

    )

    if not created:

        return Response(
            {"message": "Already in favorites"}
        )

    serializer = FavoriteSerializer(favorite)

    return Response(
        serializer.data,
        status=201,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def favorite_list(request):

    favorites = Favorite.objects.filter(
        user=request.user
    )

    serializer = FavoriteSerializer(
        favorites,
        many=True,
    )

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_favorite(request, movie_id):

    try:

        favorite = Favorite.objects.get(

            user=request.user,

             movie_id=movie_id,

        )

        favorite.delete()

        return Response(
            {"message": "Removed"}
        )

    except Favorite.DoesNotExist:

        return Response(
            {"error": "Favorite not found"},
            status=404,
        )