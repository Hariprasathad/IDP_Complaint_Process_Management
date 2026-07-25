import React from 'react';
import useWizardStore from '../../store/wizardStore';

const ConfirmationScreen = () => {
  const step4Data = useWizardStore((state) => state.formData);
  const complaintId = useWizardStore((state) => state.complaintId);
  const reset = useWizardStore((state) => state.reset);

  const isContactable = step4Data.contactPreference === 'yes';

  const handleNewComplaint = () => {
    reset();
  };

  return (
    <div className="w-full flex flex-col gap-[24px]">
      {/* Success icon */}
      <div className="flex justify-center">
        <div className="w-[64px] h-[64px] rounded-full bg-[#22c55e]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Complaint ID */}
      {complaintId && (
        <p className="text-[14px] font-medium text-[#767676] text-center">
          Complaint Reference: <span className="text-[#333333] font-semibold">{complaintId}</span>
        </p>
      )}

      {/* Confirmation message */}
      <div className="bg-[#F4F6FB] border border-[#DDE3F0] rounded-[10px] p-[24px]">
        {isContactable ? (
          <p className="text-[16px] font-normal leading-[24px] text-[#333333] text-center italic">
            Thank you for sharing. Understanding your situation helps us continually improve, and we will be in touch soon.
          </p>
        ) : (
          <div className="text-center">
            <p className="text-[16px] font-normal leading-[24px] text-[#333333] italic">
              As you have asked us <span className="underline font-medium">not</span> to contact you, we won't.
            </p>
            <p className="text-[16px] font-normal leading-[24px] text-[#333333] italic mt-2">
              That said, understanding your situation helps us to continually improve so thank you for sharing here.
            </p>
          </div>
        )}
      </div>

      {/* New complaint button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleNewComplaint}
          className="h-[44px] rounded-[24px] bg-[#4664DC] px-[24px] py-[10px] flex items-center justify-center text-white text-[16px] font-medium leading-[24px] tracking-normal transition-colors hover:bg-[#3D58CC] focus:outline-none focus:ring-2 focus:ring-[#4664DC]/30"
        >
          Submit another complaint
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
