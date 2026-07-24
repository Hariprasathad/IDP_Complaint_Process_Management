import { useState } from 'react';

const MOCK_COUNTRIES = [
  { code: 'AU', name: 'Australia', phoneCode: '+61' },
  { code: 'IN', name: 'India', phoneCode: '+91' },
  { code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
  { code: 'US', name: 'United States', phoneCode: '+1' },
  { code: 'CA', name: 'Canada', phoneCode: '+1' },
  { code: 'NZ', name: 'New Zealand', phoneCode: '+64' },
  { code: 'SG', name: 'Singapore', phoneCode: '+65' },
  { code: 'MY', name: 'Malaysia', phoneCode: '+60' },
  { code: 'PH', name: 'Philippines', phoneCode: '+63' },
  { code: 'LK', name: 'Sri Lanka', phoneCode: '+94' },
  { code: 'BD', name: 'Bangladesh', phoneCode: '+880' },
  { code: 'NP', name: 'Nepal', phoneCode: '+977' },
  { code: 'PK', name: 'Pakistan', phoneCode: '+92' },
  { code: 'VN', name: 'Vietnam', phoneCode: '+84' },
  { code: 'TH', name: 'Thailand', phoneCode: '+66' },
  { code: 'ID', name: 'Indonesia', phoneCode: '+62' },
  { code: 'CN', name: 'China', phoneCode: '+86' },
  { code: 'JP', name: 'Japan', phoneCode: '+81' },
  { code: 'KR', name: 'South Korea', phoneCode: '+82' },
  { code: 'ONLINE', name: 'Online', phoneCode: null },
];

export function useCountries() {
  const [countries] = useState(MOCK_COUNTRIES);
  return { countries, loading: false, error: null };
}
