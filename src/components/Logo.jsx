import React from 'react';
import '../styles/Logo.css';

const Logo = ({ size = 'medium' }) => {
  const sizeClass = `logo-${size}`;
  
  return (
    <div className={`logo-container ${sizeClass}`}>
      <div className="logo-icon">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50C85 30.67 69.33 15 50 15Z" fill="url(#paint0_linear)" />
          <path d="M35 35C35 32.2386 37.2386 30 40 30H60C62.7614 30 65 32.2386 65 35V65C65 67.7614 62.7614 70 60 70H40C37.2386 70 35 67.7614 35 65V35Z" fill="white" />
          <path d="M40 40H60" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 50H60" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 60H50" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
          <defs>
            <linearGradient id="paint0_linear" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4f46e5" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="logo-text">Crmble</div>
    </div>
  );
};

export default Logo;