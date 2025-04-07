import React from 'react';

export const Gradient = () => {
  return null;
};

export const VideoBar = () => {
  return (
    <div className="flex items-center p-4 bg-black/50 backdrop-blur-sm rounded-lg">
      <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      <div className="flex-1 bg-white/20 rounded-full h-1 mx-3">
        <div className="w-1/2 h-full rounded-full" style={{ backgroundColor: 'white' }}></div>
      </div>
      
      <span className="text-xs text-white/80">01:24</span>
    </div>
  );
};
