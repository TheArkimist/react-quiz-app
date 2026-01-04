import React, { useState } from 'react'
import QuizCounter from '../components/QuizCounter'
import QuizQuestions from '../components/QuizQuestions'
import QuizCompleted from '../components/QuizCompleted'


const Quiz = ({ questions }) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handles the Selection of an Answer
  const handleAnswer = (index, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [index]: answer
    });
  };

  // Handles the Submission of Answers
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Handles Retrieval of Next Question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  // Handles Retrieval of the Previous Question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } 

  };

  // Handles when Timer Reaches 0
  const handleTimeUp = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  // Checks for Correct and Incorrect Answers Selected by User
  const correctAnswer = questions.map((q, idx) => (q.correct_answer === selectedAnswers[idx] ? idx + 1 : null)).filter((q) => q !== null);
  const incorrectAnswer = questions.map((q, idx) => (q.correct_answer !== selectedAnswers[idx] ? idx + 1 : null)).filter((q) => q !== null);

  // Passes Options to Quiz Completed Component when Answers are Submitted
  if (isSubmitted) {
    return (
      <QuizCompleted 
        questions={questions}
        selectedAnswers={selectedAnswers}
        correctAnswer={correctAnswer}
        incorrectAnswer={incorrectAnswer}
      
      />
    )
  }

  // Displays Timer, Questions, Options, Previous, Next or Submit Button if Answers are not Submitted
  return (
    <div  className='w-[70%] -space-y-4 px-20 flex items-center justify-center flex-col z-20 bg-white rounded-2xl p-8 shadow-lg shadow-amber-400/30'>
      
      <div className='w-full mt-4 flex justify-between items-center mb-2'>
        <QuizCounter 
          difficulty={questions[0]?.difficulty || 'medium'}
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