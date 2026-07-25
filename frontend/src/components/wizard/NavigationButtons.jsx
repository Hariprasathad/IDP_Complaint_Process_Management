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
    <div className="w-full mt-5 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center w-full">
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
              className="px-8 py-2.5 text-[14px] bg-blue-600 border border-transparent rounded-full text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting || !canSubmit}
              className="px-8 py-2.5 text-[14px] bg-blue-600 border border-transparent rounded-full text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
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
