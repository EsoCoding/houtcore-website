// API service for about section content
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AboutSection {
  id: number;
  title: string;
  subtitle: string;
  main_content: string;
  image: string;
  is_active: boolean;
  updated_at: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  order: number;
}

export async function fetchAboutSection(): Promise<AboutSection | null> {
  try {
    const response = await fetch(`${API_URL}/about/`);
    if (!response.ok) {
      throw new Error('Failed to fetch about section');
    }
    const data: PaginatedResponse<AboutSection> = await response.json();
    
    // Return the active about section or the first one if available
    const activeSection = data.results.find(section => section.is_active);
    return activeSection || data.results[0] || null;
  } catch (error) {
    console.error('Error fetching about section:', error);
    return null;
  }
}

export async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const response = await fetch(`${API_URL}/services/`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const data: PaginatedResponse<ServiceItem> = await response.json();
    
    // Sort services by order field
    return data.results.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}
