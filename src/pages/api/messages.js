export const runtime = 'edge';

// Simple UUID v4 function compatible with Edge
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default async function handler(req) {
  const { method } = req;

  if (method === 'POST') {
    const { name, text } = await req.json();
    const timestamp = new Date().toISOString();
    const id = uuidv4();
    const newMessage = { id, name, text, timestamp };
    await MESSAGES.put(id, JSON.stringify(newMessage));
    return new Response(JSON.stringify({ message: 'Message saved' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } else if (method === 'GET') {
    const messages = await MESSAGES.list();
    const messageDetails = await Promise.all(messages.keys.map(async key => {
      const message = await MESSAGES.get(key.name, 'json');
      return message;
    }));
    return new Response(JSON.stringify({ messages: messageDetails }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } else if (method === 'PUT') {
    const { id, name, text } = await req.json();
    const message = await MESSAGES.get(id, 'json');
    if (message) {
      const updatedMessage = { id, name, text, timestamp: new Date().toISOString() };
      await MESSAGES.put(id, JSON.stringify(updatedMessage));
      return new Response(JSON.stringify({ message: 'Message updated' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      return new Response(JSON.stringify({ message: 'Message not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
  } else {
    return new Response(`Method ${method} Not Allowed`, { status: 405, headers: { 'Allow': 'GET, POST, PUT' } });
  }
}
