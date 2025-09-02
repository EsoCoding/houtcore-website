from rest_framework import serializers
from .models import Category, PortfolioItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class PortfolioItemSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = PortfolioItem
        fields = ['id', 'title', 'category', 'category_name', 'year', 
                'description', 'image', 'features', 'created_at', 'updated_at']
