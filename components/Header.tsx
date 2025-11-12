
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-10 h-10 text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.25,4.5A6.75,6.75,0,0,0,4.5,11.25v9.14a1,1,0,0,0,1,1h.39a1,1,0,0,0,1-1V12.25a4.75,4.75,0,0,1,9.5,0v8.14a1,1,0,0,0,1,1h.39a1,1,0,0,0,1-1V11.25A6.75,6.75,0,0,0,11.25,4.5Zm3.7,11.45c0-.41.34-.75.75-.75s.75,.34,.75,.75v2.8a.75.75,0,0,1-1.5,0Zm-9.3,0c0-.41.34-.75.75-.75s.75,.34,.75,.75v2.8a.75.75,0,0,1-1.5,0Z"/>
                <path fill-rule="evenodd" d="M12.75,2.25a.75.75,0,0,0-1.5,0v2.33a8.25,8.25,0,0,0,0,14.84v2.33a.75.75,0,0,0,1.5,0V19.42a8.25,8.25,0,0,0,0-14.84V2.25Z" clip-rule="evenodd"/>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              AI MCQ Generator
            </h1>
          </div>
          <p className="hidden md:block text-md text-gray-600 dark:text-gray-300">
            For <span className="font-semibold text-emerald-600 dark:text-emerald-400">Pakistan Studies</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
