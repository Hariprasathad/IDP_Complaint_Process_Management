import FieldLabel from './FieldLabel.jsx';
import InlineError from './InlineError.jsx';

export default function PhoneInput({
  codeRegister,
  phoneRegister,
  codeError,
  phoneError,
  countries = [],
  codeName = 'countryCode',
  phoneName = 'phone',
}) {
  return (
    <div>
      <FieldLabel label="Phone Number" required htmlFor={phoneName} />
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full sm:w-1/3">
          <select
            id={codeName}
            {...codeRegister}
            className={`w-full rounded-lg border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none ${
              codeError ? 'border-red-500' : 'border-grey-border'
            }`}
            aria-label="Country code"
          >
            <option value="">Code</option>
            {countries
              .filter((c) => c.phoneCode)
              .map((c) => (
                <option key={c.code} value={c.phoneCode}>
                  {c.phoneCode} ({c.code})
                </option>
              ))}
          </select>
          <InlineError message={codeError?.message} />
        </div>
        <div className="w-full sm:w-2/3">
          <input
            id={phoneName}
            type="tel"
            placeholder="Phone number"
            {...phoneRegister}
            className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue ${
              phoneError ? 'border-red-500' : 'border-grey-border'
            }`}
            aria-label="Phone number"
          />
          <InlineError message={phoneError?.message} />
        </div>
      </div>
    </div>
  );
}
