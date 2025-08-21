export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { query, generate_mode, display_mode, site, thread_id } = req.query;
  
  const params = new URLSearchParams({
    query: query || '',
    generate_mode: generate_mode || 'list',
    display_mode: display_mode || 'full',
    site: site || '',
    thread_id: thread_id || ''
  });

  const url = `https://ask.anniwang.me/ask?${params.toString()}`;
  
  try {
    const response = await fetch(url);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'text/event-stream');
    res.setHeader('Content-Type', 'text/event-stream');
    
    // Stream the response
    const reader = response.body.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    
    res.end();
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy request' });
  }
}