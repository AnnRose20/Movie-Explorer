class HostDebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("HTTP_HOST:", request.META.get("HTTP_HOST"))
        print("X_FORWARDED_HOST:", request.META.get("HTTP_X_FORWARDED_HOST"))
        print("ALLOWED_HOSTS reached")
        return self.get_response(request)