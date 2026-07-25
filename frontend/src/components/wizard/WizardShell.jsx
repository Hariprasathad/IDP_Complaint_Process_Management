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
  const { currentStep, goNext, goPrevious, submitForm, isSubmitting } = useWizardStore();

  const handleNext = () => {
    goNext();
  };

  const handlePrevious = () => {
    goPrevious();
  };

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Step 1: Heading + Intro above progress bar */}
      {currentStep === 1 && (
        <div className="w-full mb-4">
          <h1 className="text-[25px] font-bold text-gray-900 mb-2 tracking-[-0.01em]">Complaints</h1>
          <p className="text-[13px] text-gray-700 font-normal mb-2 leading-[1.6]">
            Please complete the information below so we can understand your situation better.
          </p>
          <p className="text-[13px] text-gray-700 font-normal leading-[1.6]">
            By submitting this form, you agree that the information you provide will be handled in accordance with our{' '}
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] font-medium hover:underline">Privacy Policy</a> and{' '}
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] font-medium hover:underline">Website Terms of Use</a>.
          </p>
        </div>
      )}

      {/* Progress bar */}
      {currentStep < 5 && (
        <div className="w-full">
          <ProgressBar currentStep={currentStep} totalSteps={4} />
        </div>
      )}
      
      {/* Step content */}
      <div className="w-full">
        {currentStep === 1 && <Step1_ComplaintDetails />}
        {currentStep === 2 && <Step2_IncidentLocation />}
        {currentStep === 3 && <Step3_WhoIsLodging />}
        {currentStep === 4 && <Step4_ContactPreference />}
        {currentStep === 5 && <ConfirmationScreen />}
      </div>

      {currentStep < 5 && (
        <NavigationButtons 
          currentStep={currentStep}
          totalSteps={4}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          canSubmit={true} 
        />
      )}
    </div>
  );
};

export default WizardShell;
