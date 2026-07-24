import { create } from 'zustand';

const initialState = {
  currentStep: 1,
  isSubmitting: false,
  submissionError: null,
  complaintId: null,
  step1: { description: '', attachments: [] },
  step2: { country: '', office: '', otherSpecify: '' },
  step3: { personType: '', otherSpecify: '' },
  step4: {
    contactPreference: '',
    fullName: '',
    email: '',
    countryCode: '',
    phone: '',
    currentCountry: '',
    studyDestinations: [],
    privacyAccepted: false,
  },
};

const useWizardStore = create((set) => ({
  ...initialState,
  goNext: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  goPrevious: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  setStepData: (step, data) => set((state) => ({ [step]: { ...state[step], ...data } })),
  setSubmitting: (val) => set({ isSubmitting: val }),
  setError: (msg) => set({ submissionError: msg }),
  setComplaintId: (id) => set({ complaintId: id }),
  setConfirmed: () => set({ currentStep: 'confirmed' }),
  reset: () => set(initialState),
}));

export default useWizardStore;
