export default function FieldLabel({ label, required, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-900 mb-1">
      {label}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
  );
}
