import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [error, setError] = useState('');
  const [userIp, setUserIp] = useState('');
  const [originalMessage, setOriginalMessage] = useState({ name: '', text: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
    fetchUserIp();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://messageboard-anniwang.anniwang.workers.dev/');
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        if (data.messages) {
          const sortedMessages = data.messages.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          setMessages(sortedMessages);
        }
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserIp = async () => {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      setUserIp(data.ip);
    } catch (err) {
      console.error('Error fetching user IP:', err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName.trim().length < 1 || newMessage.trim().length < 1) {
      setError('Name and message are required.');
      return;
    }

    if (
      editingMessageId &&
      userName === originalMessage.name &&
      newMessage === originalMessage.text
    ) {
      setError('No changes to save.');
      return;
    }

    const message = {
      id: editingMessageId || new Date().toISOString(),
      name: userName,
      text: newMessage,
      timestamp: new Date().toISOString(),
      ip: userIp,
    };

    try {
      await fetch('https://messageboard-anniwang.anniwang.workers.dev/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [message] }),
      });
      setNewMessage('');
      setUserName('');
      setEditingMessageId(null);
      setError('');

      setMessages((prevMessages) => {
        const updatedMessages = editingMessageId
          ? prevMessages.map((msg) => (msg.id === message.id ? message : msg))
          : [message, ...prevMessages];
        return updatedMessages.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
      });
    } catch (err) {
      console.error(`Error ${editingMessageId ? 'updating' : 'posting'} message:`, err);
    }
  };

  const handleEdit = (id, name, text) => {
    setEditingMessageId(id);
    setUserName(name);
    setNewMessage(text);
    setOriginalMessage({ name, text });
    setError('');
  };

  const handleCancel = () => {
    setEditingMessageId(null);
    setUserName('');
    setNewMessage('');
    setError('');
  };

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Head>
        <title>Board</title>
        <meta name="title" content="Board" />
        <link rel="icon" href="https://pub-4b3c8e02204249afb15ca13b88ec64ef.r2.dev/nav-logo.png" />
      </Head>
      <Navbar />
      <main className="flex-grow w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <header className="page-header">
          <h1 className="page-title">Board</h1>
          <p className="page-subtitle">Say hi or leave a note.</p>
        </header>

        <form onSubmit={handleSubmit} className="board-form">
          <div className="board-field">
            <label htmlFor="board-name" className="board-label">
              name
            </label>
            <input
              id="board-name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value.slice(0, 30))}
              placeholder="your name"
              className="board-input"
            />
            <span className="board-counter">{userName.length}/30</span>
          </div>

          <div className="board-field">
            <label htmlFor="board-message" className="board-label">
              message
            </label>
            <textarea
              id="board-message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value.slice(0, 280))}
              className="board-textarea"
              rows="4"
              placeholder="what's on your mind?"
            />
            <span className="board-counter">{newMessage.length}/280</span>
          </div>

          {error && <p className="board-error">{error}</p>}

          <div className="board-actions">
            <button type="submit" className="board-submit">
              {editingMessageId ? 'save' : 'post'}
            </button>
            {editingMessageId && (
              <button type="button" onClick={handleCancel} className="board-cancel">
                cancel
              </button>
            )}
          </div>
        </form>

        <section className="board-messages">
          {isLoading ? (
            <p className="board-empty">loading…</p>
          ) : messages.length === 0 ? (
            <p className="board-empty">no messages yet — be the first.</p>
          ) : (
            messages.map((message) => (
              <article key={message.id} className="board-message">
                <div className="board-message-header">
                  <span className="board-message-name">{message.name}</span>
                  {message.ip === userIp && (
                    <button
                      type="button"
                      onClick={() => handleEdit(message.id, message.name, message.text)}
                      className="board-edit"
                    >
                      edit
                    </button>
                  )}
                </div>
                <p className="board-message-text">{message.text}</p>
                <time className="board-message-time" dateTime={message.timestamp}>
                  {formatTimestamp(message.timestamp)}
                </time>
              </article>
            ))
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MessageBoard;
