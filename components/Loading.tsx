import React from 'react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 opacity-75 flex justify-center items-center z-50">
      <div className="spinner"></div>
      <div className="ml-3 uppercase text-white text-3xl">{message}</div>
    </div>
  );
};

export default Loading;