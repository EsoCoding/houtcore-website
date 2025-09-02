// API service for portfolio items
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: number;
  category_name: string;
  year: string;
  description: string;
  image: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  const response = await fetch(`${API_URL}/portfolio/`);
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio items');
  }
  const data: PaginatedResponse<PortfolioItem> = await response.json();
  return data.results;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories/`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data: PaginatedResponse<Category> = await response.json();
  return data.results;
}

export async function fetchPortfolioItemById(id: number): Promise<PortfolioItem> {
  const response = await fetch(`${API_URL}/portfolio/${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio item with ID: ${id}`);
  }
  return response.json();
}
