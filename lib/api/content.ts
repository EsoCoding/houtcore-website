// API service for about section content
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface AboutSection {
  id: number;
  title: string;
  subtitle: string;
  main_content: string;
  image: string | null;
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
  const response = await fetch(`${API_URL}/about/`);
  if (!response.ok) {
    throw new Error('Failed to fetch about section');
  }
  const data = await response.json();
  return data.length > 0 ? data[0] : null; // Return first active about section
}

export async function fetchServiceItems(): Promise<ServiceItem[]> {
  const response = await fetch(`${API_URL}/services/`);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
}
