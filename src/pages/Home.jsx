import React, {useEffect, useState} from 'react'
import { fetchQuizProjects } from '../api/projectAPI';
import Quiz from '../pages/Quiz'
import QuizOptions from '../components/QuizOptions';



const Home = () => {

  const [quizData, setQuizData] = useState(null);

  const startQuiz = async (options) => {
    const data = await fetchQuizProjects(
        options.category,
        options.difficulty,
        options.type,
        options.amount
    );
    
    const formattedData = data.map((item) => ({
        ...item,
        answers: [...item.incorrect_answers, item.correct_answer].sort(),
    }));
    setQuizData(formattedData);
  }


  return (
    <div className='w-full min-h-screen flex justify-center items-center m-4'>
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