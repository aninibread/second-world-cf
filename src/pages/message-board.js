import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch('/api/messages');
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          // Sort messages by timestamp in descending order
          const sortedMessages = data.messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setMessages(sortedMessages);
        } else {
          console.error('Error: Received non-JSON response:', response);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchMessages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingMessageId) {
      // Editing an existing message
      try {
        await fetch('/api/messages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingMessageId, name: userName, text: newMessage }),
        });
        setNewMessage('');
        setUserName('');
        setEditingMessageId(null);
        // Refresh messages
        const response = await fetch('/api/messages');
        const data = await response.json();
        const sortedMessages = data.messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Error updating message:', error);
      }
    } else {
      // Posting a new message
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: userName, text: newMessage }),
        });
        setNewMessage('');
        setUserName('');
        // Refresh messages
        const response = await fetch('/api/messages');
        const data = await response.json();
        const sortedMessages = data.messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Error posting message:', error);
      }
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
              <div className="w-full rounded-lg bg-gray-100 p-3 shadow-md">
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
