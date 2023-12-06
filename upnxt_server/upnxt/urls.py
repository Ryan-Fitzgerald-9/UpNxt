from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('movies/', views.MovieList.as_view(), name='movie_list'),
    path('movies/<int:pk>', views.MovieDetail.as_view(), name='movie_detail'),
    path('shows/', views.ShowList.as_view(), name='show_list'),
    path('shows/<int:pk>', views.ShowDetail.as_view(), name='show_detail'),
    path('users/', views.CustomUserList.as_view(), name='customuser_list'),
    path('users/<int:pk>', views.CustomUserDetail.as_view(), name='customuser_detail'),
    path('reviews/', views.ReviewList.as_view(), name='review_list'),
    path('reviews/<int:pk>', views.ReviewDetail.as_view(), name='review_detail'),
    path('user-favorites/toggle/<int:movie_id>', login_required(views.ToggleFavoriteView.as_view(), login_url='http://localhost:5173/Login'), name='toggle_favorite'),
]