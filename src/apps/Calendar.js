import React, { useState, useEffect } from 'react';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [view, setView] = useState('month'); // month, week, day

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    // Mock events
    const mockEvents = {
      '2023-10-15': [{ time: '10:00 AM', title: 'Meeting with team' }],
      '2023-10-20': [{ time: '2:00 PM', title: 'Doctor appointment' }],
      '2023-10-25': [{ time: '9:00 AM', title: 'Project deadline' }]
    };
    setEvents(mockEvents);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const selectDate = (day) => {
    if (day) {
      const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(selected);
    }
  };

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateKey = formatDateKey(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    return events[dateKey] || [];
  };

  const addEvent = () => {
    const title = prompt('Enter event title:');
    if (title) {
      const time = prompt('Enter time (e.g., 10:00 AM):') || 'All day';
      const dateKey = formatDateKey(selectedDate);
      const newEvent = { time, title };

      setEvents(prevEvents => ({
        ...prevEvents,
        [dateKey]: [...(prevEvents[dateKey] || []), newEvent]
      }));
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)}>‹</button>
        <h2>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={() => navigateMonth(1)}>›</button>
        <div className="view-buttons">
          <button onClick={() => setView('month')} className={view === 'month' ? 'active' : ''}>Month</button>
          <button onClick={() => setView('week')} className={view === 'week' ? 'active' : ''}>Week</button>
          <button onClick={() => setView('day')} className={view === 'day' ? 'active' : ''}>Day</button>
        </div>
      </div>

      {view === 'month' && (
        <div className="calendar-grid">
          {daysOfWeek.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day ? 'active' : 'inactive'} ${selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() ? 'selected' : ''}`}
              onClick={() => selectDate(day)}
            >
              {day && (
                <>
                  <div className="day-number">{day}</div>
                  <div className="day-events">
                    {getEventsForDate(day).slice(0, 2).map((event, i) => (
                      <div key={i} className="event-preview" title={event.title}>
                        {event.time !== 'All day' ? event.time : ''} {event.title}
                      </div>
                    ))}
                    {getEventsForDate(day).length > 2 && (
                      <div className="more-events">+{getEventsForDate(day).length - 2} more</div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="calendar-sidebar">
        <div className="selected-date-info">
          <h3>{selectedDate.toDateString()}</h3>
          <button onClick={addEvent}>Add Event</button>
        </div>
        <div className="events-list">
          <h4>Events</h4>
          {getEventsForDate(selectedDate.getDate()).map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-time">{event.time}</div>
              <div className="event-title">{event.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;