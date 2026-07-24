import React from 'react';

const ProgressBar = ({ currentStep, totalSteps = 4 }) => {
  return (
    <div className="w-full mb-10 mt-2">
      <div className="flex justify-end mb-2">
        <span className="text-[15px] text-gray-500 font-medium">Step {currentStep} of {totalSteps}</span>
      </div>
      <div className="flex gap-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          let bgColor = 'bg-[#e5e7eb]'; // Future step
          
          if (stepNumber < currentStep) {
            bgColor = 'bg-[#22c55e]'; // Completed step (green)
          } else if (stepNumber === currentStep) {
            bgColor = 'bg-[#3b82f6]'; // Current step (blue)
          }

          return (
            <div 
              key={stepNumber} 
              className={`flex-1 h-2 rounded-full ${bgColor} transition-colors duration-300`} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
