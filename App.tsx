
import React, { useState } from 'react';
import Header from './components/Header';
import McqForm from './components/McqForm';
import McqList from './components/McqList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { generateMcqs } from './services/geminiService';
import { McqItemType } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('The Mughal Empire');
  const [numMcqs, setNumMcqs] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<string>('Medium');
  const [mcqs, setMcqs] = useState<McqItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMcqs([]);
    setShowResults(true);

    try {
      const generated = await generateMcqs(topic, numMcqs, difficulty);
      setMcqs(generated);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <McqForm
              topic={topic}
              setTopic={setTopic}
              numMcqs={numMcqs}
              setNumMcqs={setNumMcqs}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-2">
            {showResults && (
              <div className="space-y-6">
                {isLoading && <Loader />}
                {error && <ErrorMessage message={error} />}
                {!isLoading && !error && <McqList mcqs={mcqs} />}
              </div>
            )}
            {!showResults && (
                 <div className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Ready to Generate</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your generated MCQs will appear here. Fill out the form and click "Generate MCQs" to start.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-4 mt-8">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Powered by Gemini API. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default App;
