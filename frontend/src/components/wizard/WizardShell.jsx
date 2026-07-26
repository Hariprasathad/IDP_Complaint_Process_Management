import React from 'react';
import useWizardStore from '../../store/wizardStore';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';
import Step1_ComplaintDetails from '../steps/Step1_ComplaintDetails';
import Step2_IncidentLocation from '../steps/Step2_IncidentLocation';
import Step3_WhoIsLodging from '../steps/Step3_WhoIsLodging';
import Step4_ContactPreference from '../steps/Step4_ContactPreference';
import ConfirmationScreen from '../steps/ConfirmationScreen';

const WizardShell = () => {
  const currentStep = useWizardStore((state) => state.currentStep);
  const isSubmitting = useWizardStore((state) => state.isSubmitting);
  const privacyAccepted = useWizardStore((state) => state.formData.privacyPolicyAccepted);
  const goPrevious = useWizardStore((state) => state.goPrevious);

  const handlePrevious = () => {
    goPrevious();
  };

  return (
    <div className="w-full max-w-[824px] mx-auto flex flex-col pt-[40px] pr-[40px] pb-[32px] pl-[40px]">
      {/* Page Header - Step 1 only */}
      {currentStep === 1 && (
        <div className="w-full max-w-[820px] flex flex-col gap-[12px] mb-[24px]">
          <h1 className="text-[36px] font-bold text-[#333333] leading-[47px] tracking-normal" style={{ fontFamily: "'Farro', sans-serif" }}>Complaints</h1>
          <p className="text-[16px] font-normal text-[#333333] leading-[24px] tracking-normal">
            Please complete the information below so we can understand your situation better.
          </p>
          <p className="text-[16px] font-normal text-[#333333] leading-[24px] tracking-normal">
            By submitting this form, you agree that the information you provide will be handled in accordance with our{' '}
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] font-normal underline decoration-solid">Privacy Policy</a> and{' '}
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] font-normal underline decoration-solid">Website Terms of Use</a>.
          </p>
        </div>
      )}

      {/* Progress bar + Divider */}
      {currentStep < 5 && (
        <div className="w-full flex flex-col gap-[20px] mb-[24px]">
          <ProgressBar currentStep={currentStep} totalSteps={4} />
          {currentStep === 1 && <div className="w-full h-px bg-[#D9D9D9]" />}
        </div>
      )}
      
      {/* Step content */}
      <div className="w-full mb-[16px]">
        {currentStep === 1 && <Step1_ComplaintDetails />}
        {currentStep === 2 && <Step2_IncidentLocation />}
        {currentStep === 3 && <Step3_WhoIsLodging />}
        {currentStep === 4 && <Step4_ContactPreference />}
        {currentStep === 5 && <ConfirmationScreen />}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 5 && (
        <NavigationButtons 
          currentStep={currentStep}
          totalSteps={4}
          onPrevious={handlePrevious}
          isSubmitting={isSubmitting}
          canSubmit={currentStep === 4 ? privacyAccepted : true}
        />
      )}
    </div>
  );
};

export default WizardShell;
