import React, { useState, useEffect } from 'react';

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [selectedList, setSelectedList] = useState('All');

  useEffect(() => {
    // Mock reminders
    const mockReminders = [
      { id: 1, text: 'Buy groceries', completed: false, list: 'Personal', dueDate: '2023-10-20' },
      { id: 2, text: 'Call dentist', completed: true, list: 'Health', dueDate: '2023-10-18' },
      { id: 3, text: 'Finish project', completed: false, list: 'Work', dueDate: '2023-10-25' }
    ];
    setReminders(mockReminders);
  }, []);

  const addReminder = () => {
    if (newReminder.trim()) {
      const reminder = {
        id: Date.now(),
        text: newReminder,
        completed: false,
        list: selectedList,
        dueDate: ''
      };
      setReminders([...reminders, reminder]);
      setNewReminder('');
    }
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const filteredReminders = selectedList === 'All'
    ? reminders
    : reminders.filter(reminder => reminder.list === selectedList);

  const lists = ['All', ...new Set(reminders.map(r => r.list))];

  return (
    <div className="reminders">
      <div className="reminders-sidebar">
        <div className="lists">
          {lists.map(list => (
            <div
              key={list}
              className={`list-item ${list === selectedList ? 'active' : ''}`}
              onClick={() => setSelectedList(list)}
            >
              {list}
            </div>
          ))}
        </div>
      </div>
      <div className="reminders-content">
        <div className="add-reminder">
          <input
            type="text"
            placeholder="Add a reminder"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addReminder()}
          />
          <button onClick={addReminder}>Add</button>
        </div>
        <div className="reminders-list">
          {filteredReminders.map(reminder => (
            <div key={reminder.id} className={`reminder-item ${reminder.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={reminder.completed}
                onChange={() => toggleReminder(reminder.id)}
              />
              <span className="reminder-text">{reminder.text}</span>
              {reminder.dueDate && <span className="due-date">{reminder.dueDate}</span>}
              <button onClick={() => deleteReminder(reminder.id)}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reminders;