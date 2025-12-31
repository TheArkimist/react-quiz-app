import React from 'react';
import parse from 'html-react-parser';

const QuizQuestions = ({ question, index, handleAnswer, selectedAnswer }) => {
  return (
    <div className='p-4 text-black text-lg'>
      <h2>
        Q{index + 1} : {parse(question?.question || '')}
      </h2>
    </div>
  );
};

export default QuizQuestions;