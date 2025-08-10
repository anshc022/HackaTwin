import React from 'react';

const HeroBackground = () => {
  return (
    <div className="hero-parent-bg absolute inset-0 -z-10">
      {/* Solid background */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-blue-50/90 via-white/80 to-purple-50/90 dark:from-gray-800/90 dark:via-gray-900/70 dark:to-indigo-900/90"></div>
      </div>

      {/* Enhanced AI Neural Network Pattern - Significantly More Visible */}
      <div className="absolute inset-0 animate-neural-pulse">
        <svg className="h-full w-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ai-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              {/* Main grid lines - Increased opacity and width */}
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4F46E5" strokeOpacity="0.9" strokeWidth="2.5" />
              {/* Center node - Larger and brighter */}
              <circle cx="25" cy="25" r="4" fill="#6366F1" fillOpacity="0.9">
                <animate attributeName="r" values="3;4;3" dur="4s" repeatCount="indefinite" />
              </circle>
              {/* Corner nodes - Larger and brighter */}
              <circle cx="0" cy="0" r="3" fill="#3B82F6" fillOpacity="0.9" />
              <circle cx="50" cy="0" r="3" fill="#8B5CF6" fillOpacity="0.9" />
              <circle cx="0" cy="50" r="3" fill="#8B5CF6" fillOpacity="0.9" />
              {/* Connection lines - Increased opacity and width */}
              <line x1="0" y1="0" x2="25" y2="25" stroke="#4F46E5" strokeOpacity="0.8" strokeWidth="2" />
              <line x1="50" y1="0" x2="25" y2="25" stroke="#8B5CF6" strokeOpacity="0.8" strokeWidth="2" />
              <line x1="0" y1="50" x2="25" y2="25" stroke="#8B5CF6" strokeOpacity="0.8" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ai-grid-pattern)" />
        </svg>
      </div>

      {/* Larger Connection Nodes with more visibility */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="animate-particle absolute rounded-full shadow-lg"
            style={{
              width: `${Math.random() * 14 + 12}px`,
              height: `${Math.random() * 14 + 12}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.4) 100%)' 
                : 'radial-gradient(circle, rgba(167, 139, 250, 0.8) 0%, rgba(139, 92, 246, 0.4) 100%)',
              boxShadow: i % 2 === 0 
                ? '0 0 10px rgba(59, 130, 246, 0.5)' 
                : '0 0 10px rgba(139, 92, 246, 0.5)',
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              zIndex: 5,
            }}
          />
        ))}
      </div>
      
      {/* Visible Connection Lines with ultra-high contrast */}
      <div className="absolute inset-0">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g stroke="url(#line-gradient)" strokeWidth="3" className="animate-pulse-soft" filter="url(#glow)">
            <line x1="10%" y1="20%" x2="30%" y2="40%" />
            <line x1="30%" y1="40%" x2="50%" y2="20%" />
            <line x1="50%" y1="20%" x2="70%" y2="40%" />
            <line x1="70%" y1="40%" x2="90%" y2="20%" />
            <line x1="20%" y1="80%" x2="40%" y2="60%" />
            <line x1="40%" y1="60%" x2="60%" y2="80%" />
            <line x1="60%" y1="80%" x2="80%" y2="60%" />
            <line x1="20%" y1="30%" x2="20%" y2="70%" />
            <line x1="80%" y1="30%" x2="80%" y2="70%" />
            <line x1="40%" y1="30%" x2="60%" y2="30%" />
            <line x1="40%" y1="70%" x2="60%" y2="70%" />
          </g>
        </svg>
      </div>

      {/* Enhanced Data Flow Effect with super-bright glowing particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={`flow-${i}`}
            className="absolute h-4 w-4 rounded-full animate-flow"
            style={{
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(147, 197, 253, 1) 0%, rgba(59, 130, 246, 0.8) 100%)' 
                : 'radial-gradient(circle, rgba(192, 132, 252, 1) 0%, rgba(139, 92, 246, 0.8) 100%)',
              filter: 'blur(0.5px)',
              left: `${10 + (i * 5)}%`,
              top: i % 4 === 0 ? '20%' : i % 4 === 1 ? '40%' : i % 4 === 2 ? '60%' : '80%',
              animationDuration: `${4 + (i % 4)}s`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: i % 2 === 0 
                ? '0 0 15px rgba(59, 130, 246, 1)' 
                : '0 0 15px rgba(139, 92, 246, 1)',
              zIndex: 15,
            }}
          />
        ))}
      </div>

      {/* Significantly enhanced glow effects */}
      <div className="animate-glow absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/40 blur-3xl"></div>
      <div className="animate-glow absolute bottom-1/4 right-1/4 h-120 w-120 translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/40 blur-3xl" style={{ animationDelay: '2s' }}></div>
      
      {/* Additional highlighted network nodes with pulsing effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`node-${i}`}
            className="absolute rounded-full animate-neural-pulse"
            style={{
              width: `${Math.random() * 10 + 20}px`,
              height: `${Math.random() * 10 + 20}px`,
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(96, 165, 250, 0.9) 0%, rgba(37, 99, 235, 0.6) 70%, transparent 100%)' 
                : 'radial-gradient(circle, rgba(167, 139, 250, 0.9) 0%, rgba(124, 58, 237, 0.6) 70%, transparent 100%)',
              boxShadow: i % 2 === 0 
                ? '0 0 20px rgba(59, 130, 246, 0.9), 0 0 40px rgba(59, 130, 246, 0.5)' 
                : '0 0 20px rgba(139, 92, 246, 0.9), 0 0 40px rgba(139, 92, 246, 0.5)',
              animationDelay: `${i * 0.5}s`,
              zIndex: 25,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBackground;
