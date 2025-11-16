import React, { useState, useEffect, useRef } from 'react';

function Terminal() {
  const [output, setOutput] = useState(['Welcome to Terminal', 'Type "help" for commands', '']);
  const [currentCommand, setCurrentCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const executeCommand = (cmd) => {
    const newOutput = [...output, `$ ${cmd}`];
    setHistory([...history, cmd]);
    setHistoryIndex(history.length + 1);

    switch (cmd.trim()) {
      case 'help':
        newOutput.push('Available commands: ls, cd, pwd, clear, history');
        break;
      case 'ls':
        newOutput.push('Desktop Documents Downloads');
        break;
      case 'pwd':
        newOutput.push('/Users/user');
        break;
      case 'clear':
        setOutput([]);
        return;
      case 'history':
        history.forEach((h, i) => newOutput.push(`${i + 1} ${h}`));
        break;
      default:
        newOutput.push(`Command not found: ${cmd}`);
    }

    newOutput.push('');
    setOutput(newOutput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setCurrentCommand(history[historyIndex - 1] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setCurrentCommand(history[historyIndex + 1] || '');
      } else {
        setHistoryIndex(history.length);
        setCurrentCommand('');
      }
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="terminal-input-line">
        <span>$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default Terminal;