import React, { useEffect, useState } from 'react'
import { fetchCategories } from '../api/projectAPI';

const QuizOptions = ({ startQuiz }) => {

  const [category, setCategory] = useState([]);
  const [options, setOptions] = useState({
    category: '',
  });

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategory(data);
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startQuiz(options);
  };


  return (
    <div className='w-[80%] -space-y-4 px-36 flex items-center justify-center flex-col z-20 relative bg-amber-400 rounded-2xl p-8 shadow-lg shadow-amber-400/30'>
      <div className='w-fit p-1 bg-transparent z-10 text-center'>
        <h1 className='text-4xl font-bold text-neutral-50/90 mb-4'>QuizMaster</h1>
        <p className='text-neutral-50/80 mb-4 text-center'>Test your knowledge with questions from around the world</p>
      </div>

      <form className='w-full flex flex-col gap-6 mt-6' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label className='text-neutral-50/80 font-medium' htmlFor='category'>Category</label>
          <select
            value={options.category}
            className='p-2 rounded-md bg-neutral-800 text-neutral-50/90'
            name='category'
            id='category'
            onChange={handleChange}
          >
            <option value=''>Any Category</option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-neutral-50/80 font-medium' htmlFor='difficulty'>Difficulty</label>
          <select
            value={options.difficulty}
            className='p-2 rounded-md bg-neutral-800 text-neutral-50/90'
            name='difficulty'
            id='difficulty'
            onChange={handleChange}
          >
            <option value=''>Any Difficulty</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-neutral-50/80 font-medium' htmlFor='type'>Type</label>
          <select
            value={options.type}
            className='p-2 rounded-md bg-neutral-800 text-neutral-50/90'
            name='type'
            id='type'
            onChange={handleChange}
          >
            <option value=''>Any Type</option>
            <option value='multiple'>Multiple Choice</option>
            <option value='boolean'>True / False</option>
          </select>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-neutral-50/80 font-medium' htmlFor='amount'>Number of Questions</label>
          <input
            type='number'
            className='p-2 rounded-md bg-neutral-800 text-neutral-50/90'
            name='amount'
            id='amount'
            min={1}
            max={50}
            value={options.amount || 10}
            onChange={handleChange}
          />
        </div>
        <button
          type='submit'
          className='w-full bg-amber-500 hover:bg-amber-600 text-neutral-900 font-bold py-2 px-4 rounded-md mt-4 transition-colors duration-300'
        >
          Start Quiz
        </button>

      </form>
    </div>
  )
}

export default QuizOptions