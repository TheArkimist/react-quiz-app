import React, { useEffect, useState } from 'react'
import { fetchCategories } from '../api/projectAPI';
import { LuBrain } from "react-icons/lu";
import { BsStars } from 'react-icons/bs';

const QuizOptions = ({ startQuiz }) => {

  const [category, setCategory] = useState([]);
  const [options, setOptions] = useState({
    category: '',
    difficulty: 'easy',
    type: 'multiple',
    amount: 10,
  });
  
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategory(data);
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptions({...options, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startQuiz(options);
  };


  return (
    <div className='w-[70%] -space-y-4 px-20 flex items-center justify-center flex-col z-20 bg-white rounded-3xl p-8 shadow-lg shadow-amber-400/30'>
      <div className='w-fit bg-transparent z-10 text-center flex justify-center items-center'>
        <LuBrain className='text-7xl text-white mx-auto mb-6 mr-3 border-none bg-linear-90 from-purple-600 to-pink-500 p-3 rounded-full'/>
        <h1 className='text-3xl text-black mb-6'>QuizMaster</h1>
        
      </div>

      
      <form className='w-[80%] flex flex-col gap-4 mt-6' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label className='text-black font-medium' htmlFor='category'>Category</label>
          <select
            value={options.category}
            className='p-2 rounded-md bg-neutral-800 text-neutral-50/90'
            name='category'
            id='category'
            onChange={handleChange}
          >
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-black font-medium' htmlFor='difficulty'>Difficulty</label>
          <select
            value={options.difficulty}
            className='p-2 rounded-md bg-neutral-800 text-neutral-50/90'
            name='difficulty'
            id='difficulty'
            onChange={(handleChange)}
          >
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-black font-medium' htmlFor='type'>Type</label>
          <select
            value={options.type}
            className='p-2 rounded-md bg-neutral-800 text-neutral-50/90'
            name='type'
            id='type'
            onChange={(handleChange)}
          >
            <option value=''>Any Type</option>
            <option value='multiple'>Multiple Choice</option>
            <option value='boolean'>True / False</option>
          </select>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-black font-medium' htmlFor='amount'>Number of Questions</label>
          <input
            type='number'
            className='p-2 rounded-md bg-neutral-800 text-neutral-50/90'
            name='amount'
            id='amount'
            min={1}
            max={50}
            value={options.amount || 10}
            onChange={(handleChange)}
          />
        </div>
        
        <button
          type='submit'
          className='w-full bg-linear-210 flex justify-center items-center from-purple-600 to-pink-500 cursor-pointer hover:text-black  text-white font-bold py-2 px-4 rounded-md mt-4 transition-colors duration-300'
        >
          <BsStars className='mr-3'/> Start Quiz
        </button>

      </form>
    </div>
  )
}

export default QuizOptions