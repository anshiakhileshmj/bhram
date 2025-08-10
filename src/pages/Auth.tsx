
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { Mic, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          setError(error.message);
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          setError(error.message);
        } else {
          setError('Check your email to confirm your account!');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Back to Home */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      {/* Logo */}
      <div className="fixed top-6 right-6 flex items-center space-x-2 z-10">
        <Mic className="w-6 h-6 text-purple-400" />
        <span className="text-lg font-semibold text-white">MJAK Voice OS</span>
      </div>

      <StyledWrapper>
        <div className="wrapper">
          <div className="card-switch">
            <label className="switch">
              <input 
                type="checkbox" 
                className="toggle" 
                checked={!isLogin}
                onChange={(e) => setIsLogin(!e.target.checked)}
              />
              <span className="slider" />
              <span className="card-side" />
              <div className="flip-card__inner">
                <div className="flip-card__front">
                  <div className="title">Log in</div>
                  {error && <div className="error-message">{error}</div>}
                  <form className="flip-card__form" onSubmit={handleSubmit}>
                    <input 
                      className="flip-card__input" 
                      name="email" 
                      placeholder="Email" 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <input 
                      className="flip-card__input" 
                      name="password" 
                      placeholder="Password" 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button 
                      className="flip-card__btn" 
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing in...' : "Let's go!"}
                    </button>
                  </form>
                </div>
                <div className="flip-card__back">
                  <div className="title">Sign up</div>
                  {error && <div className="error-message">{error}</div>}
                  <form className="flip-card__form" onSubmit={handleSubmit}>
                    <input 
                      className="flip-card__input" 
                      name="name"
                      placeholder="Name" 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <input 
                      className="flip-card__input" 
                      name="email" 
                      placeholder="Email" 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <input 
                      className="flip-card__input" 
                      name="password" 
                      placeholder="Password" 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button 
                      className="flip-card__btn" 
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating...' : 'Confirm!'}
                    </button>
                  </form>
                </div>
              </div>
            </label>
          </div>   
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .wrapper {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
  }

  .error-message {
    color: #ef4444;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
  }

  /* switch card */
  .switch {
    transform: translateY(-200px);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
  }

  .card-side::before {
    position: absolute;
    content: 'Log in';
    left: -70px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: var(--font-color);
    font-weight: 600;
  }

  .card-side::after {
    position: absolute;
    content: 'Sign up';
    left: 70px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: var(--font-color);
    font-weight: 600;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-color);
    transition: 0.3s;
  }

  .slider:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background-color: var(--input-focus);
  }

  .toggle:checked + .slider:before {
    transform: translateX(30px);
  }

  .toggle:checked ~ .card-side:before {
    text-decoration: none;
  }

  .toggle:checked ~ .card-side:after {
    text-decoration: underline;
  }

  /* card */ 
  .flip-card__inner {
    width: 300px;
    height: 400px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
  }

  .toggle:checked ~ .flip-card__front {
    box-shadow: none;
  }

  .flip-card__front, .flip-card__back {
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: lightgrey;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .flip-card__back {
    width: 100%;
    transform: rotateY(180deg);
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    margin: 20px 0 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
  }

  .flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .flip-card__btn {
    margin: 20px 0 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 0.2s;
  }

  .flip-card__btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Auth;
