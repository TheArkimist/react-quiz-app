import React, {useEffect, useState} from 'react'
import { fetchQuizQuestion } from '../api/projectAPI';
import Quiz from '../pages/Quiz'
import QuizOptions from '../components/QuizOptions';



const Home = () => {

  const [quizData, setQuizData] = useState(null);

  // Function to Pass Options Selected to Open Trivia to Fetch Questions 
  const startQuiz = async (options) => {
    const data = await fetchQuizQuestion(
        options.category,
        options.difficulty,
        options.type,
        options.amount
    );
    
    // Function to Format Questions and Answers received from Open Trivia
    const formattedData = data.map((item) => ({
        ...item,
        answers: [...item.incorrect_answers, item.correct_answer].sort(),
    }));
    setQuizData(formattedData);
  }


  return (
    <div className='w-full flex justify-center items-center m-2'>
        {!quizData ? (
            <QuizOptions startQuiz={startQuiz}/>
        ) 
            : 
            (
                <Quiz questions={quizData}/>
            )
        }

    </div>
  )
}

export default Home