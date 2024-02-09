export async function fetchCatMedia() {
    const response = await fetch('/api/list-media');
    if (!response.ok) {
      console.error('Failed to fetch cat media');
      return [];
    }
    return response.json();
  }
  