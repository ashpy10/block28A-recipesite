import React, { useState } from "react";
import { motion } from 'framer-motion'; 
import './RandomRecipeTV.css';

const RandomRecipeTV = () => {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchRecipe = async () => {
        setLoading(true);
        const res = await fetch('https://fsa-recipe.up.railway.app/api/recipes/random');
        const data = await res.json();
        setTimeout(() => {
            setRecipe(data);
            setLoading(false);
        }, 1000); 
    };

    return (
        <div className="tv-wrapper">
            <div className="tv-frame">
                <div className="tv-screen">
                    {loading ? (
                        <motion.div
                        className="tv-loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        >
                            <span className="static-text">Loading today's recipe rewind...</span>
                        </motion.div>
                    ) : recipe ? (
                        <div className="recipe-content">
                            <h3>{recipe.strMeal}</h3>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            <p>{recipe.strArea}</p>
                        </div>
                    ) : (
                        <div className="recipe-placeholder">
                            <p>🎬 Press the dial to tune in a recipe!</p>
                        </div>
                    )}
                    </div>
                    <button className="tv-dial" onClick={fetchRecipe}>📺</button>
                </div>
            </div>
    );
};

export default RandomRecipeTV;