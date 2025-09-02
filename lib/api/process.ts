// API service for process steps
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  order: number;
  is_active: boolean;
}

export async function fetchProcessSteps(): Promise<ProcessStep[]> {
  try {
    const response = await fetch(`${API_URL}/process/`);
    if (!response.ok) {
      throw new Error('Failed to fetch process steps');
    }
    const data: PaginatedResponse<ProcessStep> = await response.json();
    
    // Sort by order field and return
    return data.results.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching process steps:', error);
    return [];
  }
}
