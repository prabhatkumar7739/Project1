import { useState, useCallback } from 'react';

const useTimedMessage = (timeout = 4000) => {
  const [message, setMessage] = useState('');

  const setTimedMessage = useCallback((newMessage) => {
    setMessage(newMessage);
    if (newMessage) {
      setTimeout(() => {
        setMessage('');
      }, timeout);
    }
  }, [timeout]);

  return [message, setTimedMessage];
};

export default useTimedMessage; 