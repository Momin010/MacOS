import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [folders, setFolders] = useState([{ id: 'all', name: 'All Notes' }]);
  const [currentFolder, setCurrentFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes([
        { id: 1, title: 'Welcome', content: 'Welcome to Notes!', folder: 'all' }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled',
      content: '',
      folder: currentFolder
    };
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
  };

  const updateNote = (field, value) => {
    if (currentNote) {
      const updated = { ...currentNote, [field]: value };
      setCurrentNote(updated);
      setNotes(notes.map(n => n.id === currentNote.id ? updated : n));
    }
  };

  const handleContentChange = (content) => {
    updateNote('content', content);
  };

  const deleteNote = () => {
    if (currentNote) {
      setNotes(notes.filter(n => n.id !== currentNote.id));
      setCurrentNote(null);
    }
  };

  const filteredNotes = notes.filter(note =>
    (currentFolder === 'all' || note.folder === currentFolder) &&
    (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="notes">
      <div className="notes-sidebar">
        <button onClick={createNote}>New Note</button>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="folders">
          {folders.map(folder => (
            <div
              key={folder.id}
              className={`folder ${folder.id === currentFolder ? 'active' : ''}`}
              onClick={() => setCurrentFolder(folder.id)}
            >
              {folder.name}
            </div>
          ))}
        </div>
        <div className="notes-list">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className={`note-item ${note.id === currentNote?.id ? 'active' : ''}`}
              onClick={() => setCurrentNote(note)}
            >
              <div className="note-title">{note.title}</div>
              <div className="note-preview">{note.content.substring(0, 50)}...</div>
            </div>
          ))}
        </div>
      </div>
      <div className="notes-editor">
        {currentNote ? (
          <>
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => updateNote('title', e.target.value)}
              placeholder="Note title"
            />
            <ReactQuill
              value={currentNote.content}
              onChange={handleContentChange}
              placeholder="Start writing..."
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link', 'image'],
                  ['clean']
                ],
              }}
            />
            <button onClick={deleteNote}>Delete</button>
          </>
        ) : (
          <div>Select a note or create a new one</div>
        )}
      </div>
    </div>
  );
}

export default Notes;