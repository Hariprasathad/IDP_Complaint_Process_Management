import LoadingSpinner from '../ui/LoadingSpinner.jsx';

export default function NavigationButtons({ currentStep, onPrevious, onNext, onSubmit, isSubmitting, canSubmit }) {
  return (
    <div className="border-t border-grey-border mt-8 pt-6 flex justify-between items-center">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onPrevious}
          className="border-2 border-brand-blue text-brand-blue rounded-full px-6 py-2 text-sm font-medium hover:bg-brand-blue-light transition-colors"
        >
          ← Previous
        </button>
      ) : (
        <div />
      )}

      {currentStep < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="bg-brand-blue text-white rounded-full px-8 py-2 text-sm font-medium hover:bg-brand-blue-dark transition-colors"
        >
          Next →
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className="bg-brand-blue text-white rounded-full px-8 py-2 text-sm font-medium hover:bg-brand-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && <LoadingSpinner size="sm" />}
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      )}
    </div>
  );
}
