import React from 'react';

const ProgressBar = ({ currentStep, totalSteps = 4 }) => {
  return (
    <div className="w-full">
      <div className="flex justify-end mb-[12px]">
        <span className="text-[14px] text-[#6B7280] font-medium leading-[14px] tracking-normal">Step {currentStep} of {totalSteps}</span>
      </div>
      <div className="flex gap-[4px]">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          let bgColor = 'bg-[#e5e7eb]'; // Future step
          
          if (stepNumber < currentStep) {
            bgColor = 'bg-[#168721]'; // Completed step (green)
          } else if (stepNumber === currentStep) {
            bgColor = 'bg-[#4664DC]'; // Current step (blue)
          }

          return (
            <div 
              key={stepNumber} 
              className={`flex-1 h-[6px] rounded-full ${bgColor} transition-colors duration-300`} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
