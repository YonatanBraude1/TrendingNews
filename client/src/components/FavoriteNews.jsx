import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const FavoritesPage = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem('userId');
      console.log('Fetching favorites for userId:', userId);
      
      if (!userId) {
        setError('User ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/favorites/${userId}`);
        setFavorites(response.data.favorites || []);
      } catch (error) {
        setError('Failed to fetch favorite news');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const removeFavorite = async (newsUrl) => {
    try {
      await axios.post(`http://localhost:3001/favorites/remove`, { userId, newsUrl });
      setFavorites(favorites.filter(favorite => favorite !== newsUrl));
    } catch (error) {
      console.error('Failed to remove favorite news', error);
      setError('Failed to remove favorite news');
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-4xl mb-4">Favorite News</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && favorites.length ? (
        <ul className="w-full max-w-2xl">
          {favorites.map((newsUrl, index) => (
            <li key={index} className="p-2 bg-white mb-2 border rounded shadow-md dark:bg-gray-700 dark:border-gray-600 flex justify-between items-center">
              <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 underline">
                {newsUrl}
              </a>
              <button 
                onClick={() => removeFavorite(newsUrl)} 
                className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite news items found</p>
      )}
    </div>
  );
};

export default FavoritesPage;
