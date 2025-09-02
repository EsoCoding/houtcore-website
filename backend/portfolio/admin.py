from django.contrib import admin
from .models import Category, PortfolioItem

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'year')
    list_filter = ('category', 'year')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
