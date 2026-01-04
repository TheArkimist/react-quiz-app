import React, {useEffect, useState} from 'react'

const QuizCounter = ({ difficulty, questionCount, onTimeUp }) => {

  // Base Times Based on Difficulty Selected
  const getTimeLimit = () => {
    const baseTimes = {
      easy: 2 * 60 + 30,
      medium: 3 * 60,
      hard: 4 * 60 + 30,
    };

    // Additional Timer
    const additionalTimePerQuestion = 15; // seconds

    // Default time set to Medium
    const baseTime = baseTimes[difficulty] || 3 * 60;

    // Add Additional Time if Number of Questions exceeds 10
    if (questionCount > 10) {
      const extraQuestions = questionCount - 10;
      return baseTime + extraQuestions * additionalTimePerQuestion;
    }

    return baseTime;
  };

  // Handles countdown of the Timer and Action if Timer reaches 0
  const [timeLeft, setTimeLeft] = useState(getTimeLimit());
  useEffect(() => {
    // If timer reaches 0
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }
    // reduce Seconds by 1 if Timer is not 0
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format of the Timer (minutes:seconds)
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