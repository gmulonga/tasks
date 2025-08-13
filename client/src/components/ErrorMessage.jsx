import React from 'react';

const ErrorMessage = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      <p className="font-medium">Error:</p>
      <p>{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;