import React, { useEffect, useState } from 'react';
import { fetchNews } from '../newsService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState('');

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsData = await fetchNews();
        setNews(newsData);
      } catch (error) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);
 

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  
  const handleFavoritesPage = () => {
   
    navigate('/FavoriteNews', { state: { userId } });
  };

  // מיין את החדשות לפי קטגוריות
  const categorizedNews = news.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // סנן לפי קטגוריה נבחרת
  const filteredNews = selectedCategory === 'All' 
    ? news 
    : categorizedNews[selectedCategory] || [];

 /*const handleToggleFavorite = (newsItem) => {
      setFavorites(prevFavorites => {
        if (prevFavorites.some(fav => fav.id === newsItem.id)) {
          return prevFavorites.filter(fav => fav.id !== newsItem.id);
        }
        return [...prevFavorites, newsItem];
      });
    };*/
  
    // הוסף כפתור כוכב ליד כל פריט חדשות
    const renderNewsItem = (newsItem) => (
      <li key={newsItem.id} className="p-2 bg-white mb-2 border rounded shadow-md dark:bg-gray-700 dark:border-gray-600 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl">{newsItem.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{newsItem.description}</p>
        </div>
        <button 
          onClick={() => handleToggleFavorite(newsItem)}
          className="text-yellow-500 hover:text-yellow-600"
        >
          <i className={`fa-solid fa-star ${favorites.some(fav => fav.id === newsItem.id) ? 'text-yellow-600' : 'text-gray-400'}`}></i>
        </button>
      </li>
    );

    //add
    /*const handleToggleFavorite = async (newsItem) => {
      const userId = localStorage.getItem('userId'); // קבלת ה-User ID מהאחסון המקומי
      try {
        if (favorites.some(fav => fav.id === newsItem.id)) {
          // אם החדשה כבר מועדפת, הסר אותה
          await axios.post('http://localhost:3001/favorites/remove', { userId, newsId: newsItem.id });
          setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== newsItem.id));
          setNotification('News item removed from favorites.');
        } else {
          // אחרת, הוסף את החדשה לרשימת המועדפות
          await axios.post('http://localhost:3001/favorites/add', { userId, newsId: newsItem.id });

          setFavorites(prevFavorites => [...prevFavorites, newsItem]);
          setNotification('News item added to favorites.');
        }
      } catch (error) {
        console.error('Failed to toggle favorite status', error);
        setNotification('Failed to update favorite status.');
      }
    };*/
    const handleToggleFavorite = async (newsItem) => {
      const userId = localStorage.getItem('userId'); // קבלת ה-User ID מהאחסון המקומי
      try {
        if (favorites.some(fav => fav.url === newsItem.url)) {
          // אם החדשה כבר מועדפת, הסר אותה
          await axios.post('http://localhost:3001/favorites/remove', { userId, newsUrl: newsItem.url });
          setFavorites(prevFavorites => prevFavorites.filter(fav => fav.url !== newsItem.url));
          setNotification('News item removed from favorites.');
        } else {
          // אחרת, הוסף את החדשה לרשימת המועדפות
          await axios.post('http://localhost:3001/favorites/add', { userId, newsUrl: newsItem.url });
          setFavorites(prevFavorites => [...prevFavorites, newsItem]);
          setNotification('News item added to favorites.');
        }
      } catch (error) {
        console.error('Failed to toggle favorite status', error);
        setNotification('Failed to update favorite status.');
      }
    };
    


  return (
    <div className={`flex flex-col items-center h-screen p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="flex justify-between w-full max-w-2xl mb-4">
        <h1 className="text-4xl">Profile</h1>
        <button 
          onClick={handleToggleDarkMode} 
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="category-select" className="block text-lg mb-2">Select Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="All">All</option>
          {Object.keys(categorizedNews).map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button 
        onClick={handleFavoritesPage} 
        className="px-4 py-2 mb-4 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Favorite News
      </button>
      {notification && (
        <div className="p-4 mb-4 bg-green-100 text-green-800 border border-green-300 rounded-md dark:bg-green-800 dark:text-green-300">
          {notification}
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (selectedCategory === 'Favorites' ? favorites : filteredNews).length ? (
        <ul className="w-full max-w-2xl">
          {(selectedCategory === 'Favorites' ? favorites : filteredNews).map(newsItem => (
            <li key={newsItem.id} className="p-2 bg-white mb-2 border rounded shadow-md dark:bg-gray-700 dark:border-gray-600 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl">{newsItem.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{newsItem.description}</p>
              </div>
              <button 
                onClick={() => handleToggleFavorite(newsItem)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <i className={`fa-solid fa-star ${favorites.some(fav => fav.id === newsItem.id) ? 'text-yellow-600' : 'text-gray-400'}`}></i>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news available in this category</p>
      )}
    </div>
  );
}

export default Profile;

