import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <svg className="animate-spin h-12 w-12 text-amber-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path fill="currentColor" fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" clipRule="evenodd" className="opacity-40" />
      <path fill="currentColor" fillRule="evenodd" d="M12 2a1 1 0 0 1 1 1v5.586l2.121-2.122a1 1 0 1 1 1.414 1.415L14.414 10H20a1 1 0 1 1 0 2h-5.586l2.122 2.121a1 1 0 1 1-1.415 1.414L13 13.586V19a1 1 0 1 1-2 0v-5.414l-2.121 2.121a1 1 0 0 1-1.414-1.414L9.586 12H4a1 1 0 1 1 0-2h5.586L7.464 7.879a1 1 0 0 1 1.415-1.415L11 8.586V3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
    </svg>
  );
};

export default LoadingSpinner;