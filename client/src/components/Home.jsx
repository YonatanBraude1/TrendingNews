// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate
import { fetchNews } from '../newsService';//فونكسيا  فيتش نيوز 

function Home() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate(); // יצירת פונקציה לניווט

  useEffect(() => {
    const getNews = async () => {//فونكسيا 
      try {
        const news = await fetchNews(query, page);
        setArticles(news);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    getNews();
  }, [query, page]);

  const handleLogin = () => {
    navigate('/Login'); // ניווט לדף User
  };

  const handleSignIn = () => {
    navigate('/register'); // ניווט לדף Register
  };

  const handleSearch = () => {
    const searchQuery = prompt('Enter search term:');
    if (searchQuery) {
      setQuery(searchQuery);
      setPage(1);
    } else {
      setQuery('');
      setPage(1);
    }
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} transition-colors duration-300`}>
      <header className={`w-full py-6 px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-800'} flex flex-col items-center`}>
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TRENDING NEWS</h1>
        <button
          className={`mt-4 px-4 py-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} text-white font-bold rounded`}
          onClick={handleSearch}
        >
          Search
        </button>
      </header>
      <main className="flex-grow flex justify-center items-start pt-8">
        <div className="w-full max-w-4xl p-4">
          {articles.length === 0 ? (
            <p>No articles found.</p>
          ) : (
            articles.map((article, index) => (
              <div key={index} className={`mb-4 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
                <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
                <p className="mb-2">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Read more
                </a>
              </div>
            ))
          )}
        </div>
      </main>
      <aside className={`fixed top-0 right-0 mt-4 mr-4 w-48 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} flex flex-col items-center`}>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          onClick={handleLogin} // ניווט ל-User
        >
          Log In
        </button>
        <button
          className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button
          className="px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white font-bold rounded"
          onClick={toggleTheme}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </aside>
      <div className="fixed bottom-4 right-4 flex">
        <button
          className="mx-2 px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="mx-2 px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
