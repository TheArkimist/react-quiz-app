import React from 'react';
import parse from 'html-react-parser';

const QuizQuestions = ({ question, index, handleAnswer, selectedAnswer }) => {
  return (
    <div className='p-4 text-black text-lg'>
      <h2>
        Q{index + 1} : {parse(question?.question || '')}
      </h2>

      <div className='mt-4 flex flex-col gap-3'>
        {question?.answers.map((answer, idx) => (
          <label
            key={idx}
            className={`p-3 rounded-md border cursor-pointer hover:bg-purple-100 transition-colors duration-200 ${
              selectedAnswer === answer ? 'bg-purple-200 border-purple-600' : 'bg-white border-neutral-300'
            }`}
          >
            <input
              type='radio'
              name={`question-${index}`}
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => handleAnswer(index, answer)}
              className='mr-2'
            />
            {parse(answer)}
          </label>
          
        ))}
      </div>

    </div>
  );
};

export default QuizQuestions;