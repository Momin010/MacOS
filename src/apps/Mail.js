import React, { useState, useEffect } from 'react';

function Mail() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeMode, setComposeMode] = useState(false);
  const [newEmail, setNewEmail] = useState({ to: '', subject: '', body: '' });

  useEffect(() => {
    // Mock emails
    const mockEmails = [
      {
        id: 1,
        from: 'Apple Support',
        subject: 'Your Apple ID was used to sign in',
        body: 'We noticed a sign-in to your Apple ID...',
        date: '2023-10-01',
        read: false
      },
      {
        id: 2,
        from: 'GitHub',
        subject: 'Security alert',
        body: 'A new device signed into your account...',
        date: '2023-10-02',
        read: true
      }
    ];
    setEmails(mockEmails);
  }, []);

  const handleCompose = () => {
    setComposeMode(true);
    setSelectedEmail(null);
  };

  const handleSend = () => {
    // Mock send
    alert('Email sent!');
    setComposeMode(false);
    setNewEmail({ to: '', subject: '', body: '' });
  };

  const markAsRead = (id) => {
    setEmails(emails.map(email =>
      email.id === id ? { ...email, read: true } : email
    ));
  };

  return (
    <div className="mail">
      <div className="mail-sidebar">
        <button onClick={handleCompose}>Compose</button>
        <div className="mail-folders">
          <div className="folder active">Inbox ({emails.filter(e => !e.read).length})</div>
          <div className="folder">Sent</div>
          <div className="folder">Drafts</div>
          <div className="folder">Trash</div>
        </div>
      </div>
      <div className="mail-list">
        {emails.map(email => (
          <div
            key={email.id}
            className={`email-item ${!email.read ? 'unread' : ''} ${selectedEmail?.id === email.id ? 'selected' : ''}`}
            onClick={() => {
              setSelectedEmail(email);
              markAsRead(email.id);
            }}
          >
            <div className="email-from">{email.from}</div>
            <div className="email-subject">{email.subject}</div>
            <div className="email-date">{email.date}</div>
          </div>
        ))}
      </div>
      <div className="mail-content">
        {composeMode ? (
          <div className="compose-form">
            <input
              type="text"
              placeholder="To"
              value={newEmail.to}
              onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subject"
              value={newEmail.subject}
              onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
            />
            <textarea
              placeholder="Message"
              value={newEmail.body}
              onChange={(e) => setNewEmail({ ...newEmail, body: e.target.value })}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        ) : selectedEmail ? (
          <div className="email-view">
            <h2>{selectedEmail.subject}</h2>
            <div className="email-meta">From: {selectedEmail.from} | Date: {selectedEmail.date}</div>
            <div className="email-body">{selectedEmail.body}</div>
          </div>
        ) : (
          <div className="no-selection">Select an email to read</div>
        )}
      </div>
    </div>
  );
}

export default Mail;