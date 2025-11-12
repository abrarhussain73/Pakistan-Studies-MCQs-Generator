
import React from 'react';
import { McqItemType } from '../types';
import CheckIcon from './icons/CheckIcon';

interface McqItemProps {
  mcq: McqItemType;
  index: number;
}

const McqItem: React.FC<McqItemProps> = ({ mcq, index }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-emerald-500/50">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start">
          <span className="text-emerald-500 mr-2">{index + 1}.</span>
          <span className="flex-1">{mcq.question_en}</span>
        </h3>
        <p className="text-right font-urdu text-lg text-gray-600 dark:text-gray-300 mt-1" dir="rtl">
          {mcq.question_ur}
        </p>
      </div>
      <div className="space-y-3">
        {mcq.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === mcq.correct_answer_index;
          return (
            <div
              key={optionIndex}
              className={`flex items-start p-3 rounded-lg border-2 transition-colors ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-900/50 border-emerald-500'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-transparent'
              }`}
            >
              <div className="flex-shrink-0 mr-3">
                {isCorrect ? (
                  <CheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-500 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isCorrect ? 'text-emerald-800 dark:text-emerald-200' : 'text-gray-800 dark:text-gray-200'}`}>{option.option_en}</p>
                <p className={`text-right font-urdu text-base mt-1 ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-600 dark:text-gray-400'}`} dir="rtl">
                  {option.option_ur}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default McqItem;
