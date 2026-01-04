// Fetching Data from the Open Trivia Database

// Fetching Questions based in the Options Selected by User
export const fetchQuizQuestion = async (category, difficulty, type, amount) => {
    const baseUrl = 'https://opentdb.com/api.php?' +
        `amount=${amount}` +
        (category ? `&category=${category}` : '') +
        (difficulty ? `&difficulty=${difficulty}` : '') +
        (type ? `&type=${type}` : '');

    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error('Unexpected error occurred');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Failed to fetch questions', error);
        return [];
    } 
};


// Fetching Categories from the Open Trivia Database
export const fetchCategories = async () => {
    const categoryUrl = 'https://opentdb.com/api_category.php';
    try {
        const response = await fetch(categoryUrl);
        if (!response.ok) {
            throw new Error('Unexpected error occurred');
        }
        const data = await response.json();
        return data.trivia_categories;
    } catch (error) {
        console.error('Failed to fetch Categories:', error);
        return [];
    }
};

