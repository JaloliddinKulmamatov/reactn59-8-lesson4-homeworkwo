import React from 'react';
import loadingGif from './assets/Animation - 1722023970197.gif';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <img  src={loadingGif} alt="Loading..." className="w-96 h-96" />
    </div>
  );
};

export default Loading;
