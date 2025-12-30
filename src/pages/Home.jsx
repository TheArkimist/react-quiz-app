import React, {useEffect, useState} from 'react'
import { fetchQuizProjects } from '../api/projectAPI';
import Quiz from '../pages/Quiz'
import QuizOptions from '../components/QuizOptions';



const Home = () => {

  const [quizData, setQuizData] = useState(null);

  const startQuiz = async (options) => {
    const data = await fetchQuizProjects(
        options.category,
        
    );

  
  }


  return (
    <div className='w-full h-screen flex justify-center items-center'>
        {!quizData ? (
            <QuizOptions startQuiz={startQuiz}/>
        ) 
            : 
            (
                <Quiz />
            )
        }

    </div>
  )
}

export default Home