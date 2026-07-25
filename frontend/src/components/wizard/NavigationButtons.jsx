import React from 'react';

const NavigationButtons = ({ 
  currentStep, 
  totalSteps = 4, 
  onPrevious, 
  onNext, 
  onSubmit, 
  isSubmitting,
  canSubmit 
}) => {
  return (
    <div className="w-full">
      {/* Divider */}
      <div className="w-full h-px bg-[#D9D9D9]" />
      
      <div className="flex justify-between items-center w-full pt-[24px]">
        {/* Previous Button - hidden on step 1 to keep Next aligned right */}
        <div className={`transition-opacity duration-300 ${currentStep === 1 ? 'invisible' : 'visible'}`}>
          <button
            type="button"
            onClick={onPrevious}
            disabled={isSubmitting}
            className="px-8 py-2.5 text-[14px] border border-gray-300 rounded-full text-blue-600 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Previous
          </button>
        </div>

        {/* Next/Submit Button */}
        <div className="w-1/2 flex justify-end">
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={onNext}
              disabled={isSubmitting}
              className="w-[85px] h-[44px] rounded-[24px] bg-[#4664DC] px-[24px] py-[10px] flex items-center justify-center text-white text-[16px] font-medium leading-[24px] tracking-normal transition-colors hover:bg-[#3D58CC] focus:outline-none focus:ring-2 focus:ring-[#4664DC]/30 disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting || !canSubmit}
              className="h-[44px] rounded-[24px] bg-[#4664DC] px-[24px] py-[10px] flex items-center justify-center text-white text-[16px] font-medium leading-[24px] tracking-normal transition-colors hover:bg-[#3D58CC] focus:outline-none focus:ring-2 focus:ring-[#4664DC]/30 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit complaint'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationButtons;
