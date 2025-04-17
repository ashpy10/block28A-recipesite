import React, { useEffect, useState, useContext } from 'react';
import './RecipeGrid.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; 
import { saveToFavorites } from './Favorites';
import { motion } from 'framer-motion';


const RecipeGrid = ({ cuisine }) => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [savedId, setSavedId] = useState(null);

  const handleFavoriteClick = (recipe) => {
    if (!user) {
        navigate('/login'); 
    } else {
        saveToFavorites(user, recipe);
        setSavedId(recipe.idMeal);
        setTimeout(() => setSavedId(null), 1500);
    }
  };

  useEffect(() => {
    const fetchAndFilter = async () => {
      const res = await fetch('https://fsa-recipe.up.railway.app/api/recipes');
      const data = await res.json();
      const filtered = data.filter(r => r.strArea === cuisine);
      setFilteredRecipes(filtered);
    };
    fetchAndFilter();
  }, [cuisine]);

  return (
    <div className="grid-section">
      <h2 className="grid-title">🍝 {cuisine} Recipes</h2>
      <div className='grid-wrapper'>
      <div className="recipe-grid">
        {filteredRecipes.map(recipe => (
          <div key={recipe.idMeal} className="recipe-card">
                <div className="reels">
                    <div className="reel left-reel"></div>
                    <div className="reel right-reel"></div>
                </div>
            <Link to={`/recipe/${recipe.idMeal}`}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <div className="recipe-info">
                <h3>{recipe.strMeal}</h3>
                <p>{recipe.strArea} • {recipe.strCategory}</p>
                </div>
            </Link>

            <button className='favorite-button' onClick={() => handleFavoriteClick(recipe)}>
            {savedId === recipe.idMeal ? '✅ Saved!' : '⭐'}
            </button>
            {savedId === recipe.idMeal && (
                <motion.div className='saved-toast' 
                initial={{ opacity: 0, y: 10}} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10}}
                transition={{ duration: 0.4 }}
                >
                    Added to Favorites! 
                </motion.div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default RecipeGrid;
