import { useEffect } from 'react';
import useWizardStore from '../store/wizardStore.js';

export function useBeforeUnload() {
  useEffect(() => {
    const handler = (e) => {
      const state = useWizardStore.getState();
      const hasData =
        state.step1.description ||
        state.step1.attachments.length > 0 ||
        state.step2.country ||
        state.step3.personType ||
        state.step4.contactPreference;

      if (hasData && state.currentStep !== 'confirmed') {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);
}
