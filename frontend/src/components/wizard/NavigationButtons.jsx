import React from 'react';

/**
 * NavigationButtons triggers form submission via the form's id attribute.
 * Each step form handles its own validation (via RHF) and calls goNext() on success.
 * The "Previous" button directly calls goPrevious() without validation.
 * 
 * Responsive:
 * - Desktop (>700px): Previous left, Next/Submit right
 * - Mobile (<700px): Full-width Next/Submit, Previous below or hidden on Step 1
 */
const NavigationButtons = ({ 
  currentStep, 
  totalSteps = 4, 
  onPrevious, 
  isSubmitting,
  canSubmit = true,
}) => {
  const formId = `step${currentStep}-form`;

  return (
    <div className="w-full">
      {/* Divider - hidden on mobile */}
      <div className="w-full h-px bg-[#D9D9D9] hidden sm:block" />
      
      {/* Desktop layout (>700px) */}
      <div className="hidden sm:flex justify-between items-center w-full pt-[24px]">
        {/* Previous Button */}
        <div className={currentStep === 1 ? 'invisible' : ''}>
          <button
            type="button"
            onClick={(e) => { e.currentTarget.blur(); onPrevious(); }}
            disabled={isSubmitting}
            className="w-[139px] h-[44px] rounded-[24px] border border-[#4664DC] bg-white px-[24px] py-[10px] flex items-center justify-center text-[#4664DC] text-[16px] font-semibold leading-[24px] tracking-normal shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] cursor-pointer hover:bg-[#0657AD] hover:text-white hover:border-[#0657AD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30"
          >
            ← Previous
          </button>
        </div>

        {/* Next/Submit Button */}
        <div>
          {currentStep < totalSteps ? (
            <button
              type="submit"
              form={formId}
              disabled={isSubmitting}
              className="w-[85px] h-[44px] rounded-[24px] bg-[#4664DC] px-[24px] py-[10px] flex items-center justify-center text-white text-[16px] font-semibold leading-[24px] tracking-normal cursor-pointer hover:bg-[#0657AD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              form={formId}
              disabled={isSubmitting || !canSubmit}
              className="w-[170px] h-[44px] rounded-[24px] bg-[#4664DC] px-[24px] py-[10px] flex items-center justify-center gap-[10px] text-white text-[16px] font-semibold leading-[24px] tracking-normal whitespace-nowrap cursor-pointer hover:bg-[#0657AD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting && (
                <div className="flex items-end gap-[4px] h-[12px]">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#F57C00] animate-[jump_0.9s_infinite_ease-in-out]" />
                  <span className="w-[5px] h-[5px] rounded-full bg-[#4CAF50] animate-[jump_0.9s_infinite_ease-in-out_0.15s]" />
                  <span className="w-[5px] h-[5px] rounded-full bg-white animate-[jump_0.9s_infinite_ease-in-out_0.3s]" />
                </div>
              )}
              {isSubmitting ? 'Submitting...' : 'Submit complaint'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile layout (<700px) */}
      <div className="flex sm:hidden gap-3 pt-[16px] justify-center">
        {/* Step 1: Full-width Next only */}
        {currentStep === 1 && (
          <button
            type="submit"
            form={formId}
            disabled={isSubmitting}
            className="w-full h-[44px] rounded-[24px] bg-[#4664DC] px-[16px] py-[10px] flex items-center justify-center text-white text-[14px] font-semibold leading-[24px] tracking-normal whitespace-nowrap cursor-pointer transition-all duration-200 ease hover:bg-[#0657AD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}

        {/* Step 2-4: Previous + Next/Submit side by side */}
        {currentStep > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.currentTarget.blur(); onPrevious(); }}
              disabled={isSubmitting}
              className="w-[170px] h-[44px] rounded-[24px] border border-[#4664DC] bg-white px-[16px] py-[10px] flex items-center justify-center text-[#4664DC] text-[14px] font-semibold leading-[24px] tracking-normal whitespace-nowrap cursor-pointer hover:bg-[#0657AD] hover:text-white hover:border-[#0657AD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30"
            >
              ← Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="submit"
                form={formId}
                disabled={isSubmitting}
                className="w-[170px] h-[44px] rounded-[24px] bg-[#4664DC] px-[16px] py-[10px] flex items-center justify-center text-white text-[14px] font-semibold leading-[24px] tracking-normal whitespace-nowrap cursor-pointer transition-all duration-200 ease hover:bg-[#0657AD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                form={formId}
                disabled={isSubmitting || !canSubmit}
                className="w-[170px] h-[44px] rounded-[24px] bg-[#4664DC] px-[16px] py-[10px] flex items-center justify-center gap-[10px] text-white text-[14px] font-semibold leading-[24px] tracking-normal whitespace-nowrap cursor-pointer transition-all duration-200 ease hover:bg-[#0657AD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4664DC]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting && (
                  <div className="flex items-end gap-[4px] h-[12px]">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#F57C00] animate-[jump_0.9s_infinite_ease-in-out]" />
                    <span className="w-[5px] h-[5px] rounded-full bg-[#4CAF50] animate-[jump_0.9s_infinite_ease-in-out_0.15s]" />
                    <span className="w-[5px] h-[5px] rounded-full bg-white animate-[jump_0.9s_infinite_ease-in-out_0.3s]" />
                  </div>
                )}
                {isSubmitting ? 'Submitting...' : 'Submit complaint'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
