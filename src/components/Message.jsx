import React from 'react';

const Message = ({ text, type }) => {
  if (!text) {
    return null;
  }

  const baseClasses = 'p-4 mb-4 text-sm rounded-lg text-center';
  const typeClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type] || 'bg-gray-100 text-gray-800'}`} role="alert">
      {text}
    </div>
  );
};

export default Message; 