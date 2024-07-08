import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://messageboard-anniwang.anniwang44.workers.dev/');
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        if (data.messages) {
          const sortedMessages = data.messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setMessages(sortedMessages);
        } else {
          console.error('Error: Messages property is missing in response data:', data);
        }
      } else {
        console.error('Error: Received non-JSON response:', response);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName.trim().length < 1 || newMessage.trim().length < 1) {
      setError('Both name and message must be at least 1 character long.');
      return;
    }

    const url = `https://messageboard-anniwang.anniwang44.workers.dev/`;
    const payload = {
      messages: [
        {
          id: editingMessageId || new Date().toISOString(),
          name: userName,
          text: newMessage,
          timestamp: new Date().toISOString()
        }
      ]
    };
    const method = 'PUT';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setNewMessage('');
      setUserName('');
      setEditingMessageId(null);
      setError('');
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error(`Error ${editingMessageId ? 'updating' : 'posting'} message:`, error);
    }
  };

  const handleEdit = (id, name, text) => {
    setEditingMessageId(id);
    setUserName(name);
    setNewMessage(text);
  };

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Head>
        <title>Message Board</title>
        <link rel="icon" href="https://pub-4b3c8e02204249afb15ca13b88ec64ef.r2.dev/nav-logo.png" />
      </Head>
      <Navbar />
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 my-4">message board 💬</h1>
        <p>Come say hi or leave a message!</p>
        <br/>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="mb-4 relative">
          <div className="relative">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value.slice(0, 30))}
              placeholder="Your Name"
              className="w-full p-2 border rounded mb-2 relative"
            />
            <div className="absolute right-2 top-2 text-sm text-gray-500">{userName.length}/30</div>
          </div>
          <div className="relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value.slice(0, 280))}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Your Message"
            />
            <div className="absolute right-2 bottom-2 text-sm text-gray-500">{newMessage.length}/280</div>
          </div>
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            {editingMessageId ? 'Update Message' : 'Post Message'}
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {messages.map((message, index) => (
            <div key={index} className="flex justify-start">
              <div className="w-full rounded-lg bg-gray-100 p-3 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center">
                    <strong>{message.name}</strong>
                    <button
                      onClick={() => handleEdit(message.id, message.name, message.text)}
                      className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="mt-1">{message.text}</p>
                </div>
                <div className="text-right mt-2">
                  <small className="text-gray-500">{new Date(message.timestamp).toLocaleString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MessageBoard;
