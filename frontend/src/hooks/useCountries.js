import { useEffect } from 'react';
import useWizardStore from '../store/wizardStore';
import { getCountries } from '../services/complaintApi';

/**
 * Fetches countries on first call and stores in Zustand.
 * Subsequent calls return cached data from the store.
 * Call this in App.jsx or WizardShell to prefetch on Step 1.
 */
export function useCountries() {
  const countries = useWizardStore((state) => state.countries);
  const loading = useWizardStore((state) => state.countriesLoading);
  const error = useWizardStore((state) => state.countriesError);
  const setCountries = useWizardStore((state) => state.setCountries);
  const setCountriesLoading = useWizardStore((state) => state.setCountriesLoading);
  const setCountriesError = useWizardStore((state) => state.setCountriesError);

  useEffect(() => {
    // Don't fetch if already loaded or currently loading
    if (countries.length > 0 || !loading) return;

    let isMounted = true;

    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        if (isMounted) {
          setCountries(data);
        }
      } catch (err) {
        if (isMounted) {
          setCountriesError(err.message || 'Failed to load countries');
        }
      }
    };

    fetchCountries();

    return () => {
      isMounted = false;
    };
  }, [countries.length, loading, setCountries, setCountriesError]);

  return { countries, loading, error };
}
