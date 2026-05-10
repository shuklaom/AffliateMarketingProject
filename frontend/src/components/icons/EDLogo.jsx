import React from 'react';
import './EDLogo.css';

const EDLogo = ({ size = 80, animated = true, className = '' }) => {
  return (
    <div className={`ed-logo-container ${animated ? 'animated' : ''} ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="ed-logo-svg"
      >
        <defs>
          {/* 3D gradient for depth effect */}
          <linearGradient id="edGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#26d0ce', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
          </linearGradient>
          
          {/* Shadow gradient */}
          <filter id="shadowFilter">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* 3D effect shadow base */}
        <rect
          x="10"
          y="12"
          width="80"
          height="80"
          rx="20"
          ry="20"
          fill="#000000"
          opacity="0.08"
          className="ed-shadow"
        />

        {/* Main rounded square with 3D gradient */}
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="20"
          ry="20"
          fill="url(#edGradient3D)"
          className="ed-background"
          filter="url(#shadowFilter)"
        />

        {/* Subtle 3D top highlight for depth */}
        <rect
          x="10"
          y="10"
          width="80"
          height="40"
          rx="20"
          ry="20"
          fill="#ffffff"
          opacity="0.15"
          className="ed-highlight"
        />

        {/* Letter "E" - minimalist style */}
        <text
          x="32"
          y="63"
          fontSize="44"
          fontWeight="700"
          fill="#ffffff"
          textAnchor="middle"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          letterSpacing="0"
          className="ed-letter ed-letter-e"
        >
          E
        </text>

        {/* Letter "D" - minimalist style */}
        <text
          x="68"
          y="63"
          fontSize="44"
          fontWeight="700"
          fill="#ffffff"
          textAnchor="middle"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          letterSpacing="0"
          className="ed-letter ed-letter-d"
        >
          D
        </text>

        {/* Minimalist accent line */}
        <line
          x1="15"
          y1="50"
          x2="85"
          y2="50"
          stroke="#ffffff"
          strokeWidth="1.5"
          opacity="0.3"
          className="ed-accent-line"
        />
      </svg>
    </div>
  );
};

export default EDLogo;
