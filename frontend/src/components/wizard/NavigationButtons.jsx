import React from 'react';

/**
 * NavigationButtons triggers form submission via the form's id attribute.
 * Each step form handles its own validation (via RHF) and calls goNext() on success.
 * The "Previous" button directly calls goPrevious() without validation.
 */
const NavigationButtons = ({ 
  currentStep, 
  totalSteps = 4, 
  onPrevious, 
  isSubmitting,
  canSubmit = true,
}) => {
  // Map current step to the form id
  const formId = `step${currentStep}-form`;

  return (
    <div className="w-full">
      {/* Divider */}
      <div className="w-full h-px bg-[#D9D9D9]" />
      
      <div className="flex justify-between items-center w-full pt-[24px]">
        {/* Previous Button */}
        <div className={`transition-opacity duration-300 ${currentStep === 1 ? 'invisible' : 'visible'}`}>
          <button
            type="button"
            onClick={onPrevious}
            disabled={isSubmitting}
            className="w-[139px] h-[44px] rounded-[24px] border border-[#4664DC] bg-white px-[24px] py-[10px] flex items-center justify-center text-[#4664DC] text-[16px] font-semibold leading-[24px] tracking-normal shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] cursor-pointer transition-all duration-200 ease hover:bg-[#3D58CC] hover:text-white hover:border-[#3D58CC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30"
          >
            ← Previous
          </button>
        </div>

        {/* Next/Submit Button — triggers form submit via form attribute */}
        <div>
          {currentStep < totalSteps ? (
            <button
              type="submit"
              form={formId}
              disabled={isSubmitting}
              className="w-[85px] h-[44px] rounded-[24px] bg-[#4664DC] px-[24px] py-[10px] flex items-center justify-center text-white text-[16px] font-medium leading-[24px] tracking-normal cursor-pointer transition-all duration-200 ease hover:bg-[#3D58CC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              form={formId}
              disabled={isSubmitting || !canSubmit}
              className="h-[44px] rounded-[24px] bg-[#4664DC] px-[24px] py-[10px] flex items-center justify-center text-white text-[16px] font-medium leading-[24px] tracking-normal cursor-pointer transition-all duration-200 ease hover:bg-[#3D58CC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30 disabled:opacity-50 disabled:cursor-not-allowed"
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
