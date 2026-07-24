export default function ProgressBar({ currentStep }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="mb-8">
      <div className="flex gap-2">
        {steps.map((step) => {
          let colorClass = 'bg-grey-border';
          if (step < currentStep) colorClass = 'bg-success-green';
          if (step === currentStep) colorClass = 'bg-brand-blue';

          return (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full ${colorClass}`}
              aria-label={`Step ${step}${step === currentStep ? ' (current)' : step < currentStep ? ' (completed)' : ''}`}
            />
          );
        })}
      </div>
      <p className="text-sm text-gray-500 text-right mt-2">Step {currentStep} of 4</p>
    </div>
  );
}
