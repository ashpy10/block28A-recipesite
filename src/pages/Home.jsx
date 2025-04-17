import React from "react";
import RandomRecipeTV from "../components/RandomRecipeTV";
import CuisineShelf from '../components/CuisineShelf';
import { useState } from 'react';
import RecipeGrid from '../components/RecipeGrid';

const Home = () => {
    const [selectedCuisine, setSelectedCuisine] = useState(null);


    return (
        <div>
            <h1>Feeling Spicy? </h1>
            <p>Press The Dial For Tonight's Surprise Dish</p>
            <RandomRecipeTV />
            <CuisineShelf onSelectCuisine={setSelectedCuisine} />
            {selectedCuisine && <RecipeGrid cuisine={selectedCuisine} />}
        </div>
    )
};

export default Home;