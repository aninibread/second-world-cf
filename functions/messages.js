export async function onRequest(context) {
    const { request } = context
    const { method } = request
  
    if (method === 'GET') {
      const messages = await getMessages(context)
      return new Response(JSON.stringify(messages), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  
    if (method === 'POST') {
      const body = await request.json()
      await saveMessage(context, body)
      return new Response('Message saved', { status: 201 })
    }
  
    return new Response('Not found', { status: 404 })
  }
  
  async function getMessages(context) {
    const kvNamespace = context.env.MESSAGES
    const keys = await kvNamespace.list()
    const messages = await Promise.all(keys.keys.map(key => kvNamespace.get(key.name, 'json')))
    return messages
  }
  
  async function saveMessage(context, message) {
    const kvNamespace = context.env.MESSAGES
    const id = new Date().toISOString()
    await kvNamespace.put(id, JSON.stringify(message))
  }
  