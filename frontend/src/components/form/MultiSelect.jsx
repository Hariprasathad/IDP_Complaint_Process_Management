import { useState, useRef, useEffect } from 'react';
import FieldLabel from './FieldLabel.jsx';
import InlineError from './InlineError.jsx';

export default function MultiSelect({ label, name, required = false, options = [], value = [], onChange, error }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleOption(optValue) {
    const updated = value.includes(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange(updated);
  }

  return (
    <div ref={containerRef} className="relative">
      <FieldLabel label={label} required={required} htmlFor={name} />
      <button
        type="button"
        id={name}
        onClick={() => setOpen(!open)}
        className={`w-full rounded-lg border px-4 py-3 text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue ${
          error ? 'border-red-500' : 'border-grey-border'
        }`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {value.length > 0 ? `${value.length} selected` : 'Select destinations'}
        <span className="float-right text-gray-400">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-grey-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 px-4 py-2 hover:bg-grey-bg cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={() => toggleOption(opt.value)}
                className="w-4 h-4 rounded border-grey-border text-brand-blue focus:ring-brand-blue"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((v) => {
            const opt = options.find((o) => o.value === v);
            return (
              <span key={v} className="inline-flex items-center gap-1 bg-brand-blue-light text-brand-blue text-xs rounded-full px-2 py-1">
                {opt?.label || v}
                <button
                  type="button"
                  onClick={() => toggleOption(v)}
                  className="hover:text-brand-blue-dark"
                  aria-label={`Remove ${opt?.label || v}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}

      <InlineError message={error?.message} />
    </div>
  );
}
