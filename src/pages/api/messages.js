import { getCloudflareContext } from "@opennextjs/cloudflare";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default async function handler(req, res) {
  const { env } = await getCloudflareContext({ async: true });
  const { MESSAGES } = env;

  if (!MESSAGES) {
    return res.status(500).json({ message: "MESSAGES KV namespace not configured" });
  }

  const { method } = req;

  if (method === "POST") {
    const { name, text } = req.body;
    const timestamp = new Date().toISOString();
    const id = uuidv4();
    const newMessage = { id, name, text, timestamp };
    await MESSAGES.put(id, JSON.stringify(newMessage));
    return res.status(201).json({ message: "Message saved" });
  }

  if (method === "GET") {
    const messages = await MESSAGES.list();
    const messageDetails = await Promise.all(
      messages.keys.map(async (key) => MESSAGES.get(key.name, "json"))
    );
    return res.status(200).json({ messages: messageDetails });
  }

  if (method === "PUT") {
    const { id, name, text } = req.body;
    const message = await MESSAGES.get(id, "json");
    if (message) {
      const updatedMessage = { id, name, text, timestamp: new Date().toISOString() };
      await MESSAGES.put(id, JSON.stringify(updatedMessage));
      return res.status(200).json({ message: "Message updated" });
    }
    return res.status(404).json({ message: "Message not found" });
  }

  res.setHeader("Allow", "GET, POST, PUT");
  return res.status(405).json({ message: `Method ${method} Not Allowed` });
}
