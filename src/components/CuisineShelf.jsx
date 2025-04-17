import React, { useEffect, useState } from 'react';
import './CuisineShelf.css'; 

const CuisineShelf = ({ onSelectCuisine }) => {
    const [recipes, setRecipes] = useState([]);
    const [cuisines, setCuisines] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://fsa-recipe.up.railway.app/api/recipes');
            const data = await res.json();
            setRecipes(data); 
            const uniqueCuisines = [...new Set(data.map(r => r.strArea))];
            setCuisines(uniqueCuisines);
        };
        fetchData();
    }, []);


    return (
        <div className='vhs-shelf'>
            <h2>📼 Choose a Cuisine Tape</h2>
            <div className='vhs-row'>
                {cuisines.map((cuisine) => (
                    <div 
                        key={cuisine}
                        className='vhs-tape'
                        onClick={() => onSelectCuisine(cuisine)}
                    >
                        <div className='tape-label'>{cuisine}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CuisineShelf;