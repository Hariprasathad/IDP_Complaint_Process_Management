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
      {currentStep < 5 && (
        <div className="w-full">
          <ProgressBar currentStep={currentStep} totalSteps={4} />
        </div>
      )}
      
      <div className="w-full flex-grow">
        {currentStep === 1 && (
          <>
            <div className="mb-12">
              <h1 className="text-[36px] font-bold text-gray-900 mb-8 tracking-tight">Complaints</h1>
              <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                Please complete the information below so we can understand your situation better.
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                By submitting this form, you agree that the information you provide will be handled in accordance with our{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
                <a href="#" className="text-blue-600 hover:underline">Website Terms of Use</a>.
              </p>
            </div>
            <Step1_ComplaintDetails />
          </>
        )}
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
