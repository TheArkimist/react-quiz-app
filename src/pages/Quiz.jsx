import React, { useState } from 'react'
import QuizCounter from '../components/QuizCounter'
import QuizQuestions from '../components/QuizQuestions'
import QuizCompleted from '../components/QuizCompleted'


const Quiz = ({ questions }) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (index, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [index]: answer
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } 

  };

  const handleTimeUp = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  }

  const correctAnswer = questions.map((q, idx) => (q.correct_answer === selectedAnswers[idx] ? idx + 1 : null)).filter((q) => q !== null);
  const incorrectAnswer = questions.map((q, idx) => (q.correct_answer === selectedAnswers[idx] && selectedAnswers[idx] ? idx + 1 : null)).filter((q) => q !== null);

  if (isSubmitted) {
    return (
      <QuizCompleted />
    )
  }

  return (
    <div  className='w-[70%] -space-y-4 px-20 flex items-center justify-center flex-col z-20 bg-white rounded-2xl p-8 shadow-lg shadow-amber-400/30'>
      
      <div className='w-full mt-4 flex justify-between items-center mb-2'>
        <QuizCounter 
          
          questionCount={questions.length}
          onTimeUp={handleTimeUp}
        />
        
        <h2 className='text-xl font-semibold mb-4'>Question {currentQuestion + 1} of {questions.length}</h2>
        
      </div>

      <QuizQuestions 
        question ={questions[currentQuestion]}
        index={currentQuestion}
        handleAnswer={handleAnswer}
        selectedAnswer={selectedAnswers[currentQuestion]}
      />

      <div className='w-full flex justify-between mt-6'>
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className='px-4 py-2 bg-purple-600 text-white rounded-md disabled:cursor-not-allowed disabled:bg-gray-400'
        >
          Previous
        </button>
        {isSubmitted ? null : (
          <button
            onClick={handleNextQuestion}
            className='px-4 py-2 cursor-pointer hover:bg-pink-800 bg-pink-500 text-white rounded-md'
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        )}
      </div>

    </div>
  )
}

export default Quiz