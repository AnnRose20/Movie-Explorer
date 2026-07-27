import json
import urllib.request

from django.conf import settings
from django.core.management.base import BaseCommand

from movies.models import Movie


class Command(BaseCommand):
    help = "Import popular movies from TMDB"

    def handle(self, *args, **kwargs):

        API_KEY = settings.TMDB_API_KEY

        total_imported = 0

        # Import first 5 pages (100 movies)
        for page in range(1, 11):

            url = (
                f"https://api.themoviedb.org/3/movie/popular"
                f"?api_key={API_KEY}&page={page}"
            )

            print(f"\nImporting Page {page}...")

            try:

                import urllib.request
                import json

                request = urllib.request.Request(
                    url,
                    headers={
                        "User-Agent": "Mozilla/5.0"
                    }
                )

                with urllib.request.urlopen(request) as response:

                    data = json.loads(response.read().decode())

            except Exception as e:

                self.stdout.write(
                    self.style.ERROR(str(e))
                )

                return

            movies = data["results"]

            for movie in movies:

                Movie.objects.update_or_create(

                    tmdb_id=movie["id"],

                    defaults={

                        "title": movie["title"],

                        "overview": movie["overview"],

                        "poster": f"https://image.tmdb.org/t/p/w500{movie['poster_path']}",

                        "backdrop": f"https://image.tmdb.org/t/p/original{movie['backdrop_path']}",

                        "release_date": movie["release_date"],

                        "rating": movie["vote_average"],

                        "category": "popular",

                    }

                )

                total_imported += 1

            print(f"Page {page} Imported.")

        self.stdout.write(

            self.style.SUCCESS(

                f"\nSuccessfully imported {total_imported} movies."

            )

        )