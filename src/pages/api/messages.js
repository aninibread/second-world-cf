export const runtime = 'edge';

// Simple UUID v4 function compatible with Edge
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Simulated messages storage (you'll need to replace this with KV or Durable Objects for persistent storage)
let messages = [];

export default async function handler(req) {
  const { method } = req;

  if (method === 'POST') {
    const { name, text } = await req.json();
    const timestamp = new Date().toISOString();
    const id = uuidv4();
    messages.push({ id, name, text, timestamp });
    return new Response(JSON.stringify({ message: 'Message saved' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } else if (method === 'GET') {
    return new Response(JSON.stringify({ messages }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } else if (method === 'PUT') {
    const { id, name, text } = await req.json();
    const messageIndex = messages.findIndex((msg) => msg.id === id);
    if (messageIndex !== -1) {
      messages[messageIndex].name = name;
      messages[messageIndex].text = text;
      messages[messageIndex].timestamp = new Date().toISOString();
      return new Response(JSON.stringify({ message: 'Message updated' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      return new Response(JSON.stringify({ message: 'Message not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
  } else {
    return new Response(`Method ${method} Not Allowed`, { status: 405, headers: { 'Allow': 'GET, POST, PUT' } });
  }
}
