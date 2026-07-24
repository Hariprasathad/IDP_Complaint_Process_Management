import InlineError from './InlineError.jsx';

export default function Checkbox({ label, name, register, error }) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register}
          className="mt-0.5 w-4 h-4 rounded border-grey-border text-brand-blue focus:ring-brand-blue"
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
      <InlineError message={error?.message} />
    </div>
  );
}
