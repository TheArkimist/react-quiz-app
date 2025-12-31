import React, {useEffect, useState} from 'react'

const QuizCounter = ({ difficulty, questionCount, onTimeUp }) => {

  const getTimeLimit = () => {
    const baseTimes = {
      easy: 2 * 60 + 30,
      medium: 3 * 60,
      hard: 4 * 60 + 30,
    };

    const additionalTimePerQuestion = 15; // seconds

    const baseTime = baseTimes[difficulty] || 3 * 60;

    if (questionCount > 10) {
      const extraQuestions = questionCount - 10;
      return baseTime + extraQuestions * additionalTimePerQuestion;
    }

    return baseTime;
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLimit());
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };



  return (
    <div className='text-black font-medium text-lg'>
      Time Left: {formatTime(timeLeft)}

    </div>
  )
}

export default QuizCounter