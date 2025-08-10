
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handlePricing = () => {
    // You can add pricing page navigation later
    console.log('Pricing clicked');
  };

  return (
    <StyledWrapper>
      <div className="hero">
        <div className="text-section">
          <h1>
            20+ High Quality Microsoft Neural Edge Voices,<br />
            Multiple Languages, Male &amp; Female in One API.
          </h1>
          <p>
            Fast REST API with voice management, streaming, CORS support, and Base64
            audio output.
          </p>
        </div>
        <div className="button-container">
          <div className="button" onClick={handleGetStarted}>
            <span>Get Started</span>
          </div>
          <div className="button" onClick={handlePricing}>
            <span>See Pricing</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Caveat|Righteous&display=swap");

  .hero {
    background: black;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .text-section {
    text-align: center;
  }

  h1 {
    font-family: "Righteous", cursive;
    background: url("https://media.giphy.com/media/FE0WTM8BG754I/giphy.gif") center
      center no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3.2rem;
    letter-spacing: 10px;
    background-size: cover;
    margin: 0px;
  }

  p {
    font-family: "Caveat", cursive;
    color: transparent;
    font-size: 2rem;
    letter-spacing: 5px;
    margin: 10px 0 20px 0;
    background: linear-gradient(to right, #c4c4c4, #6a6a6a);
    -webkit-background-clip: text;
  }

  /* Buttons container: row layout */
  .button-container {
    perspective: 1000px;
    display: flex;
    flex-direction: row;
    gap: 20px; /* space between buttons */
  }

  /* Button styles */
  .button {
    width: 200px;
    height: 60px;
    border-radius: 30px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.05)
    );
    box-shadow:
      inset 0 1px 2px rgba(255, 255, 255, 0.4),
      inset 0 -1px 2px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(255, 255, 255, 0.1);
    transform: rotateX(15deg) translateZ(0);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    position: relative;
    cursor: pointer;
    animation: pulse 2s infinite ease-in-out;
    overflow: hidden;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50px;
    width: 50px;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: skewX(-25deg);
    animation: shine 3s infinite linear;
    pointer-events: none;
    z-index: 1;
  }

  .button::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 10%;
    width: 80%;
    height: 10px;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.3) 0%,
      transparent 70%
    );
    z-index: -1;
  }

  .button span {
    position: relative;
    z-index: 2;
    color: white;
    font-size: 18px;
    font-family: Arial, sans-serif;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    display: block;
    line-height: 60px;
    text-align: center;
  }

  .button:hover {
    transform: rotateX(0deg) translateZ(15px) scale(1.05);
    box-shadow:
      inset 0 1px 2px rgba(255, 255, 255, 0.4),
      inset 0 -1px 2px rgba(0, 0, 0, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(255, 255, 255, 0.25);
  }

  .button:active {
    transform: rotateX(0deg) translateZ(-5px) scale(0.95);
    box-shadow:
      inset 0 1px 2px rgba(255, 255, 255, 0.4),
      inset 0 -1px 2px rgba(0, 0, 0, 0.2),
      0 2px 4px rgba(0, 0, 0, 0.2),
      0 0 10px rgba(255, 255, 255, 0.1);
  }

  @keyframes pulse {
    0%,
    100% {
      box-shadow:
        inset 0 1px 2px rgba(255, 255, 255, 0.4),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 4px 8px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(255, 255, 255, 0.1);
    }
    50% {
      box-shadow:
        inset 0 1px 2px rgba(255, 255, 255, 0.4),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 4px 8px rgba(0, 0, 0, 0.2),
        0 0 30px rgba(255, 255, 255, 0.2);
    }
  }

  @keyframes shine {
    0% {
      left: -50px;
    }
    100% {
      left: 250px;
    }
  }
`;

export default Landing;
