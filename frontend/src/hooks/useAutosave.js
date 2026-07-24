import { useEffect, useRef } from 'react';
import useWizardStore from '../store/wizardStore.js';

const STORAGE_KEY = 'idp_complaint_draft';
const DEBOUNCE_MS = 500;

export function useAutosave() {
  const timerRef = useRef(null);

  useEffect(() => {
    // Hydrate store from sessionStorage on mount
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        const store = useWizardStore.getState();
        if (data.step1) store.setStepData('step1', data.step1);
        if (data.step2) store.setStepData('step2', data.step2);
        if (data.step3) store.setStepData('step3', data.step3);
        if (data.step4) store.setStepData('step4', data.step4);
      }
    } catch {
      // Ignore parse errors
    }

    // Subscribe to store changes and debounce saves
    const unsubscribe = useWizardStore.subscribe((state) => {
      // Clear on confirmation
      if (state.currentStep === 'confirmed') {
        sessionStorage.removeItem(STORAGE_KEY);
        return;
      }

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        try {
          const draft = {
            step1: state.step1,
            step2: state.step2,
            step3: state.step3,
            step4: state.step4,
          };
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        } catch {
          // Storage full or unavailable
        }
      }, DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
}
