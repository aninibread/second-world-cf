export async function fetchCatImageKeys() {
    const response = await fetch('/api/list-media');
    if (!response.ok) {
      console.error('Failed to fetch cat media');
      return [];
    }
    return (await response.json()).imageKeys
  }
  