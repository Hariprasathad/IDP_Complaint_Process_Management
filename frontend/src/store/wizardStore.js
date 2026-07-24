import { create } from 'zustand';

const initialState = {
  currentStep: 1,
  isSubmitting: false,
  complaintId: null,
  step1: {},
  step2: {},
  step3: {},
  step4: {}
};

const useWizardStore = create((set, get) => ({
  ...initialState,

  goNext: () => set((state) => {
    if (state.currentStep < 4) {
      return { currentStep: state.currentStep + 1 };
    }
    return state;
  }),

  goPrevious: () => set((state) => {
    if (state.currentStep > 1) {
      return { currentStep: state.currentStep - 1 };
    }
    return state;
  }),

  submitForm: () => set({ currentStep: 5 }),

  setStepData: (stepNumber, data) => set((state) => ({
    [`step${stepNumber}`]: {
      ...state[`step${stepNumber}`],
      ...data
    }
  })),

  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  
  setComplaintId: (complaintId) => set({ complaintId }),

  reset: () => set(initialState)
}));

export default useWizardStore;
