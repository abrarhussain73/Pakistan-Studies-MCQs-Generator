import React from 'react';
import { McqItemType } from '../types';
import McqItem from './McqItem';

interface McqListProps {
  mcqs: McqItemType[];
}

const McqList: React.FC<McqListProps> = ({ mcqs }) => {
    const copyToClipboard = () => {
        const textToCopy = mcqs.map((mcq, index) => {
            let mcqText = `${index + 1}. ${mcq.question_en}\n   ${mcq.question_ur}\n`;
            mcq.options.forEach((opt, optIndex) => {
                mcqText += `  ${String.fromCharCode(65 + optIndex)}) ${opt.option_en} (${opt.option_ur})${optIndex === mcq.correct_answer_index ? ' (Correct)' : ''}\n`;
            });
            return mcqText;
        }).join('\n');

        navigator.clipboard.writeText(textToCopy)
            .then(() => alert('MCQs copied to clipboard!'))
            .catch(err => console.error('Failed to copy text: ', err));
    };

    const downloadAsWord = () => {
        const header = `
          <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
          <head>
            <meta charset='utf-8'>
            <title>MCQs</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
              body { font-family: 'Inter', sans-serif; font-size: 12pt; }
              .urdu { font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; text-align: right; }
              .question-block { page-break-inside: avoid; margin-bottom: 24px; }
              .options { list-style-type: none; padding-left: 20px; }
              .option { margin-bottom: 8px; }
              .correct { font-weight: bold; }
            </style>
          </head>
          <body>
        `;
    
        const footer = '</body></html>';
    
        const content = mcqs.map((mcq, index) => {
            const optionsHtml = mcq.options.map((opt, optIndex) => {
                const isCorrect = optIndex === mcq.correct_answer_index;
                const className = isCorrect ? 'correct' : '';
                const optionLetter = String.fromCharCode(65 + optIndex);
                return `
                  <li class="option">
                    <span class="${className}">${optionLetter}) ${opt.option_en}</span>
                    <br/>
                    <span class="urdu ${className}">${opt.option_ur}</span>
                  </li>
                `;
            }).join('');
    
            return `
              <div class="question-block">
                <p><b>${index + 1}. ${mcq.question_en}</b></p>
                <p class="urdu">${mcq.question_ur}</p>
                <ul class="options">${optionsHtml}</ul>
              </div>
            `;
        }).join('<hr style="border: 0; border-top: 1px solid #ccc;" />');
    
        const sourceHtml = header + content + footer;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHtml);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'pakistan-studies-mcqs.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    };


  if (mcqs.length === 0) {
    return (
        <div className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No MCQs Generated Yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Fill out the form above to get started.</p>
        </div>
    );
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Generated Questions</h2>
            <div className="flex items-center space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 border border-transparent rounded-md hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 dark:bg-emerald-900 dark:text-emerald-200 dark:hover:bg-emerald-800"
                >
                    Copy All
                </button>
                <button
                  onClick={downloadAsWord}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                >
                    Download as Word
                </button>
            </div>
        </div>
        <div className="space-y-6">
            {mcqs.map((mcq, index) => (
                <McqItem key={index} mcq={mcq} index={index} />
            ))}
        </div>
    </div>
  );
};

export default McqList;