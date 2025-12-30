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
    <div className='w-[80%] -space-y-4 px-36 flex items-center justify-center flex-col z-20 relative bg-amber-400'>
      <div className='w-fit p-1 bg-transparent rounded-xl z-10 border-b-2 border-neutral-50/20'>
        <h1 className='text-4xl font-bold text-neutral-50/90 mb-4'>Quiz Options</h1>
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
      </form>
    </div>
  )
}

export default QuizOptions