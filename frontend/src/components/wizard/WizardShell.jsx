import useWizardStore from '../../store/wizardStore.js';
import ProgressBar from './ProgressBar.jsx';
import NavigationButtons from './NavigationButtons.jsx';
import ConfirmationScreen from './ConfirmationScreen.jsx';
import Step1_ComplaintDetails from '../steps/Step1_ComplaintDetails.jsx';
import Step2_IncidentLocation from '../steps/Step2_IncidentLocation.jsx';
import Step3_WhoIsLodging from '../steps/Step3_WhoIsLodging.jsx';
import Step4_ContactPreference from '../steps/Step4_ContactPreference.jsx';
import { useRef } from 'react';

export default function WizardShell() {
  const { currentStep, goPrevious, isSubmitting } = useWizardStore();

  // Refs to trigger validation from child step components
  const stepRef = useRef(null);

  async function handleNext() {
    if (stepRef.current?.triggerNext) {
      await stepRef.current.triggerNext();
    }
  }

  async function handleSubmit() {
    if (stepRef.current?.triggerSubmit) {
      await stepRef.current.triggerSubmit();
    }
  }

  if (currentStep === 'confirmed') {
    return <ConfirmationScreen />;
  }

  function renderStep() {
    switch (currentStep) {
      case 1:
        return <Step1_ComplaintDetails ref={stepRef} />;
      case 2:
        return <Step2_IncidentLocation ref={stepRef} />;
      case 3:
        return <Step3_WhoIsLodging ref={stepRef} />;
      case 4:
        return <Step4_ContactPreference ref={stepRef} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <ProgressBar currentStep={currentStep} />
      {renderStep()}
      <NavigationButtons
        currentStep={currentStep}
        onPrevious={goPrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        canSubmit={true}
      />
    </div>
  );
}
