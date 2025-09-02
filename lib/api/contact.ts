// API service for contact form and information
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ContactInfoItem {
  id: number;
  title: string;
  value: string;
  description: string;
  icon_name: string;
  order: number;
}

export interface ContactInfo {
  id?: number;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  social_media?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

export async function fetchContactInfo(): Promise<PaginatedResponse<ContactInfoItem> | null> {
  try {
    const response = await fetch(`${API_URL}/contact/info/`);
    if (!response.ok) {
      throw new Error('Failed to fetch contact information');
    }
    const data: PaginatedResponse<ContactInfoItem> = await response.json();
    
    // Return the full paginated response
    return data;
  } catch (error) {
    console.error('Error fetching contact information:', error);
    return null;
  }
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
  const response = await fetch(`${API_URL}/contact/submit/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to submit contact form');
  }
  
  return response.json();
}
