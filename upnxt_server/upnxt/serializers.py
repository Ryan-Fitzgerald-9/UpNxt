from rest_framework import serializers
from .models import Review, Movie, Show, CustomUser
from dj_rest_auth.registration.serializers import RegisterSerializer


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    # Hyperlinked fields to represent related resources
    movie = serializers.HyperlinkedRelatedField(
        view_name='movie_detail',
        read_only=True
    )
    # PrimaryKeyRelated fields to accept related IDs
    movie_id = serializers.PrimaryKeyRelatedField(
        queryset=Movie.objects.all(),
        source='movie'
    )

    show = serializers.HyperlinkedRelatedField(
        view_name='show_detail',
        read_only=True
    )

    show_id = serializers.PrimaryKeyRelatedField(
        queryset=Show.objects.all(),
        source='show'
    )

    user = serializers.HyperlinkedRelatedField(
        view_name='customuser_detail',
        read_only=True
    )

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        source='user'
    )

    class Meta:
        model = Review
        fields = ('id', 'movie', 'movie_id', 'show', 'show_id', 'user', 'user_id', 'user_favorite')

class MovieSerializer(serializers.HyperlinkedModelSerializer):
    # Nested ReviewSerializer to include favorites
    reviews = ReviewSerializer(
        many=True,
        read_only=True
    )
    # Serializer URL field for hyperlinked related resource
    movie_url = serializers.ModelSerializer.serializer_url_field(
        view_name='movie_detail'
    )

    class Meta:
        model = Movie
        fields = ('id', 'movie_url', 'title', 'genre', 'release_date', 'length_in_mins', 'image_url', 'director', 'actors', 'available_on', 'imdb_score', 'overview', 'reviews')
# Serializer for the Show model - may use for shows at a later date
class ShowSerializer(serializers.HyperlinkedModelSerializer):
    reviews = ReviewSerializer(
        many=True,
        read_only=True
    )
    # HyperlinkedIdentityField for show URL
    show_url = serializers.HyperlinkedIdentityField(
        view_name='show_detail',
    )

    class Meta:
        model = Show
        fields = ('id', 'show_url', 'title', 'genre', 'release_date', 'seasons', 'image_url', 'director', 'actors', 'available_on', 'imdb_score', 'overview', 'reviews')

# Serializer for the CustomUser model
class CustomUserSerializer(serializers.ModelSerializer):
    # Nested ReviewSerializer to include user's reviews
    reviews = ReviewSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'reviews')

# Serializer for user registration
class CustomRegisterSerializer(RegisterSerializer):
    user_id = serializers.SerializerMethodField()

    def get_user_id(self, obj):
        return obj.id

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['user_id'] = self.get_user_id(self.user)
        return data