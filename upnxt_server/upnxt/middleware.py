import json

class LogPostDataMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.method == 'POST':
            try:
                # Load the request body data into a dict
                data = json.loads(request.body)
                # Log username and password - be cautious with logging sensitive data
                username = data.get('username', 'No Username')
                password = data.get('password', 'No Password')
                print(f"Username: {username}, Password: {password}")
            except json.JSONDecodeError:
                print("Could not decode JSON from request body")
        return None