import React, { useState, useEffect } from 'react';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Mock conversations
    const mockConversations = [
      {
        id: 1,
        contact: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
        unread: 2,
        messages: [
          { id: 1, text: 'Hi there!', sender: 'me', time: '10:25 AM' },
          { id: 2, text: 'Hey, how are you?', sender: 'John Doe', time: '10:26 AM' },
          { id: 3, text: 'I\'m good, thanks! How about you?', sender: 'me', time: '10:28 AM' },
          { id: 4, text: 'Doing great! Want to meet up later?', sender: 'John Doe', time: '10:30 AM' }
        ]
      },
      {
        id: 2,
        contact: 'Jane Smith',
        lastMessage: 'See you tomorrow!',
        time: 'Yesterday',
        unread: 0,
        messages: [
          { id: 1, text: 'Good morning!', sender: 'me', time: '9:00 AM' },
          { id: 2, text: 'Morning! Ready for the meeting?', sender: 'Jane Smith', time: '9:05 AM' },
          { id: 3, text: 'Yes, I have all the documents ready.', sender: 'me', time: '9:10 AM' },
          { id: 4, text: 'Perfect! See you at 10.', sender: 'Jane Smith', time: '9:15 AM' },
          { id: 5, text: 'See you tomorrow!', sender: 'Jane Smith', time: '5:00 PM' }
        ]
      }
    ];
    setConversations(mockConversations);
  }, []);

  const sendMessage = () => {
    if (!selectedConversation || !newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: newMessage,
          time: 'Now'
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="messages">
      <div className="conversations-list">
        {conversations.map(conversation => (
          <div
            key={conversation.id}
            className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
            onClick={() => setSelectedConversation(conversation)}
          >
            <div className="contact-avatar">{conversation.contact.charAt(0)}</div>
            <div className="conversation-info">
              <div className="contact-name">{conversation.contact}</div>
              <div className="last-message">{conversation.lastMessage}</div>
            </div>
            <div className="conversation-meta">
              <div className="time">{conversation.time}</div>
              {conversation.unread > 0 && (
                <div className="unread-badge">{conversation.unread}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-area">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <div className="contact-avatar">{selectedConversation.contact.charAt(0)}</div>
              <div className="contact-name">{selectedConversation.contact}</div>
            </div>
            <div className="messages-list">
              {selectedConversation.messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                >
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{message.time}</div>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-conversation">Select a conversation to start messaging</div>
        )}
      </div>
    </div>
  );
}

export default Messages;