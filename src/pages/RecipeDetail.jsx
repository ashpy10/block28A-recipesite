import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetail.css';
import { motion } from 'framer-motion';
import { saveToFavorites } from '../components/Favorites';
import { AuthContext } from '../components/AuthContext';


const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (!user) {
        navigate('/login');
    } else {
        saveToFavorites(user, recipe);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch('https://fsa-recipe.up.railway.app/api/recipes');
      const data = await res.json();
      const found = data.find(r => r.idMeal === id);
      setRecipe(found);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div className="loading">📼 Loading your recipe tape...</div>;

  return (
    <motion.div 
        className='recipe-detail-container'
        initial={{ y: '100vh', opacity: 0}}
        animate={{ y:0, opacity: 1}}
        exit={{ y: '-100vh', opacity: 0}}
        transition={{
            type: 'spring', 
            stiffness: 80,
            damping: 14,
            delay: 0.1
        }}
    >
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-img" />
      
      <div className="tags">
        <span>{recipe.strCategory}</span> • <span>{recipe.strArea}</span>
      </div>

      <h2>📝 Instructions</h2>
      <p>{recipe.strInstructions}</p>

      <h2>🧂 Ingredients</h2>
      <ul>
        {recipe.ingredients?.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        ))}
      </ul>

      {recipe.strYoutube && (
        <>
          <h2>🎬 Watch it in Action</h2>
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
            {recipe.strYoutube}
          </a>
        </>
      )}
        <button className='favorite-button' onClick={handleFavoriteClick}>
            ⭐ Save to Recipe Favorites
        </button>
    </motion.div>
  );
};

export default RecipeDetail;
