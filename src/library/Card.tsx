import React from 'react';

const Card: React.FC = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
      <h4 className="font-bold text-xl mb-2">Sample Card</h4>
      <p className="text-gray-700 text-base">
        This is a sample card component. It demonstrates the dynamic loading feature.
      </p>
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Action Button
      </button>
    </div>
  );
};

export default Card;