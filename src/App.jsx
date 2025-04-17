import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Favorites from './pages/Favorites';



function App() {


  return (
    <>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path='/recipe/:id' element={<RecipeDetail />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </>

  )
}

export default App;
