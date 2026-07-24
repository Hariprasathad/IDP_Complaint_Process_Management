import FieldLabel from './FieldLabel.jsx';
import InlineError from './InlineError.jsx';

export default function Dropdown({
  label,
  name,
  required = false,
  register,
  error,
  options = [],
  placeholder = 'Select an option',
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <FieldLabel label={label} required={required} htmlFor={name} />
      <select
        id={name}
        {...register}
        className={`w-full rounded-lg border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none ${
          error ? 'border-red-500' : 'border-grey-border'
        }`}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <InlineError message={error?.message} />
    </div>
  );
}
