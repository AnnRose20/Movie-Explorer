from django.contrib import admin
from .models import Movie, Favorite


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "rating",
        "release_date",
    )

    search_fields = ("title",)

    list_filter = ("release_date",)

admin.site.register(Favorite)