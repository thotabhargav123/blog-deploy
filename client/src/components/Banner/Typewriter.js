import { useState, useEffect } from 'react';

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else {
      timeout = setTimeout(() => {
        setCurrentText('');
        setCurrentIndex(0);
      }, 5000 + text.length * delay); // Delay 5 seconds plus additional time for each character in the text
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

export default Typewriter;
