import React from 'react';
import useWizardStore from '../../store/wizardStore';

const ConfirmationScreen = () => {
  const { step4 } = useWizardStore();
  
  // Use the "yes" flow if contactPreference is "yes", otherwise "no" flow
  const contactPreference = step4?.contactPreference || 'yes';

  const message =
    contactPreference === "yes"
      ? {
          title: "Thank you for sharing.",
          description: "Understanding your situation helps us continually improve and we will be in touch soon."
        }
      : {
          title: "As you have asked us not to contact you, we won't.",
          description: "That said, understanding your situation helps us continually improve so thank you for sharing."
        };

  return (
    <div className="w-full mt-4">
      <div className="bg-slate-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-700 text-lg mb-2">
          {message.title === "As you have asked us not to contact you, we won't." ? (
            <>As you have asked us <span className="underline">not</span> to contact you, we won't.</>
          ) : (
            message.title
          )}
        </p>
        <p className="text-gray-700 text-lg">
          {message.description}
        </p>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
