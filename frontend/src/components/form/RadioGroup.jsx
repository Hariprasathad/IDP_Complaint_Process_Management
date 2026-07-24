import InlineError from './InlineError.jsx';

export default function RadioGroup({ label, name, required = false, register, error, options = [] }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-900 mb-3">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </legend>
      <div className="space-y-3">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value={opt.value}
              {...register}
              className="w-4 h-4 text-brand-blue border-grey-border focus:ring-brand-blue"
            />
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
      <InlineError message={error?.message} />
    </fieldset>
  );
}
