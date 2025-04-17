import React, { useContext, useState } from 'react'; 
import '../pages/Login.css'; 
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true); 
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsLogin((prev) => !prev);
    }; 

    const handleSubmit = (e) => {
        e.preventdefault(); 

        const formData = new FormData(e.target); 
        const email = formData.get('email');
        const password = formData.get('password'); 
        const username = formData.get(username);

        const userData = {
            email,
            username: isLogin ? 'User' : username, 
        };

        login(userData);
        navigate('/favorites');
    };

    return (
        <div className='auth-container'>
            <h2>{isLogin ? 'Log In To Recipe Rewind' : 'Create Your Own Flavor Tape'}</h2>

            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder='Email' required />
                <input type="password" name="password" placeholder='Password' required />
                {!isLogin && (
                    <input type="text" name="username" placeholder='Username' required />
                )}
                <button type="Submit">{isLogin ? 'Log In' : 'Create An Account'}</button>
            </form>

        <div className='auth-switch'>
            {isLogin ? (
                <>
                Don't have a recipe tape yet?{' '}
                <span className='neon-link' onClick={toggleMode}>
                    Create Account
                </span>
                </>
            ) : (
                <>
                    Already have a tape?{' '}
                    <span className='neon-link' onClick={toggleMode}>
                        Log In
                    </span>
                </>
            )}
        </div>
        </div>
    )
}

export default AuthForm;