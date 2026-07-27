from django.urls import path
from .views import movie_list, movie_detail, search_movies, top_rated_movies, upcoming_movies, recommended_movies, movie_trailer, favorite_list, add_favorite, remove_favorite

urlpatterns = [
    path("", movie_list, name="movie-list"),

    path("top-rated/", top_rated_movies, name="top-rated"),

    path("upcoming/", upcoming_movies, name="upcoming"),

    path("search/", search_movies, name="search-movies"),

    path("<int:id>/recommendations/", recommended_movies, name="recommended-movies",),

    path("<int:id>/", movie_detail, name="movie-detail"),

    path("<int:id>/trailer/", movie_trailer, name="movie-trailer"),

    path("favorites/", favorite_list),

    path("favorites/add/", add_favorite),

    path("favorites/remove/<int:movie_id>/", remove_favorite,),
]