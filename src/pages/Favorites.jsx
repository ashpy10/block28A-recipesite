import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { getFavorites, removeFromFavorites } from '../components/Favorites';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const saved = getFavorites(user);
      setFavorites(saved);
    }
  }, [user]);

  const handleRemove = (idMeal) => {
    removeFromFavorites(user, idMeal);
    setFavorites(prev => prev.filter(recipe => recipe.idMeal !== idMeal));
  };

  if (!user) return <p>Please log in to view your recipe tape collection. 🎞️</p>;

  return (
    <>
    <h2>🎬 My Favorite Flavor Collection</h2>
    <div className="favorites-page">
      <div className="favorites-grid">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="favorite-card">
            <Link to={`/recipe/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
                <p><strong>Origin:</strong> {recipe.strArea}</p>
                <p><strong>Category:</strong> {recipe.strCategory}</p>
                {recipe.strTags && <p><strong>Tags:</strong> {recipe.strTags}</p>}
                {recipe.ingredients && (
                <p><strong>Ingredients:</strong> {recipe.ingredients.length}</p>
                )}
            </Link>
            <button onClick={() => handleRemove(recipe.idMeal)}>❌ Remove</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Favorites;
