import FieldLabel from './FieldLabel.jsx';
import InlineError from './InlineError.jsx';

export default function TextInput({
  label,
  name,
  required = false,
  placeholder = '',
  register,
  error,
  type = 'text',
  maxLength,
  className = '',
}) {
  const errorId = `${name}-error`;

  return (
    <div className={className}>
      <FieldLabel label={label} required={required} htmlFor={name} />
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register}
        className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue ${
          error ? 'border-red-500' : 'border-grey-border'
        }`}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
      />
      <InlineError message={error?.message} />
    </div>
  );
}
