import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';
let messages = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, text } = req.body;
    const timestamp = new Date().toISOString();
    const id = uuidv4();
    messages.push({ id, name, text, timestamp });
    res.status(201).json({ message: 'Message saved' });
  } else if (req.method === 'GET') {
    res.status(200).json({ messages });
  } else if (req.method === 'PUT') {
    const { id, name, text } = req.body;
    const messageIndex = messages.findIndex((msg) => msg.id === id);
    if (messageIndex !== -1) {
      messages[messageIndex].name = name;
      messages[messageIndex].text = text;
      messages[messageIndex].timestamp = new Date().toISOString();
      res.status(200).json({ message: 'Message updated' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
