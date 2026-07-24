import useWizardStore from '../../store/wizardStore.js';

export default function ConfirmationScreen() {
  const { complaintId, step4 } = useWizardStore();
  const isContactYes = step4.contactPreference === 'yes';

  return (
    <div className="text-center py-12">
      {/* Success icon */}
      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Complaint ID */}
      {complaintId && (
        <p className="text-2xl font-bold text-gray-900 mb-4">
          Complaint ID: {complaintId}
        </p>
      )}

      {/* Message based on contact preference */}
      <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
        {isContactYes
          ? 'Thank you for sharing. Understanding your situation helps us continually improve and we will be in touch soon.'
          : 'As you have asked us not to contact you, we won\'t. That said, understanding your situation helps us continually improve so thank you for sharing.'}
      </p>

      {/* Return button */}
      <a
        href="https://www.idp.com"
        className="inline-block bg-brand-blue text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-brand-blue-dark transition-colors"
      >
        Return to IDP.com
      </a>
    </div>
  );
}
