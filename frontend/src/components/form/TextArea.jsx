import FieldLabel from './FieldLabel.jsx';
import InlineError from './InlineError.jsx';

export default function TextArea({
  label,
  name,
  required = false,
  register,
  error,
  maxLength,
  placeholder = '',
  rows = 6,
  watch,
}) {
  const errorId = `${name}-error`;
  const currentLength = watch ? watch(name)?.length || 0 : 0;

  return (
    <div>
      <FieldLabel label={label} required={required} htmlFor={name} />
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register}
        className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-y ${
          error ? 'border-red-500' : 'border-grey-border'
        }`}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
      />
      {maxLength && (
        <p className="text-xs text-gray-500 mt-1 text-right">
          {currentLength} / {maxLength}
        </p>
      )}
      <InlineError message={error?.message} />
    </div>
  );
}
