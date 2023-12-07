from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MovieSerializer, ShowSerializer, CustomUserSerializer, ReviewSerializer
from .models import Review, Movie, Show, CustomUser
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


class MovieList(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class ShowList(generics.ListCreateAPIView):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer

class ShowDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer

class CustomUserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class CustomUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# Added to toggle favorites
class ToggleFavoriteView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, movie_id, *args, **kwargs):
        print('favorites')
        try:
            
            user = request.user

            # Check if the movie has an associated Review for the current user
            review, created = Review.objects.get_or_create(user=user, movie_id=movie_id)

            # Check if the review already exists
            if not created:
                # If the review already exists, delete it
                review.delete()
                status_message = 'removed from favorites'
            else:
                # If the review was created, toggle the user_favorite field
                review.user_favorite = not review.user_favorite
                review.save()
                status_message = 'added to favorites'

            return Response({'status': 'success', 'user_favorite': review.user_favorite})
        except Exception as e:
            # Handle other potential exceptions
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)