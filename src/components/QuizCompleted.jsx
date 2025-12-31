import React from 'react'

const QuizCompleted = ({ questions, selectedAnswers, correctAnswer, incorrectAnswer}) => {

  const notAnswered = questions.map((_, idx) => (selectedAnswers[idx] ? null : idx + 1)).filter((q) => q !== null);

  return (
    <div className='w-[70%] -space-y-4 px-20 flex items-center justify-center flex-col z-20 bg-white rounded-3xl p-10  shadow-lg shadow-amber-400/30'>
      <div className='w-[80%] flex flex-col items-center justify-center space-y-6'>
        <h2 className='text-3xl font-bold text-green-600'>Quiz Completed!</h2>
        <div className='w-full flex flex-col gap-4'>
        <p className='mb-2'>Total Questions: {questions.length}</p>
        <p className='mb-2 text-green-600'>Correct Answers: {correctAnswer.length} {correctAnswer.length > 0 && ` (Questions: ${correctAnswer.join(', ')})`}</p>
        <p className='mb-2 text-red-600'>Incorrect Answers: {incorrectAnswer.length} {incorrectAnswer.length > 0 && ` (Questions: ${incorrectAnswer.join(', ')})`}</p>
        <p className='mb-2 text-gray-600'>Not Answered: {notAnswered.length} {notAnswered.length > 0 && ` (Questions: ${notAnswered.join(', ')})`}</p>
        </div>

      </div>
     
    </div>
  )
}

export default QuizCompleted