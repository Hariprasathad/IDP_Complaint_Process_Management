import * as yup from 'yup';

const MAX_DESCRIPTION_LENGTH = 5000;

export const step1Schema = yup.object().shape({
  description: yup
    .string()
    .required('Please answer this question')
    .test(
      'not-only-spaces',
      'Please answer this question',
      (value) => value && value.trim().length > 0
    )
    .test(
      'no-emojis',
      'Description contains unsupported characters. Please use only letters, numbers, and standard punctuation.',
      (value) => {
        if (!value) return true;
        // Reject emojis and extended Unicode symbols
        const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/u;
        return !emojiRegex.test(value);
      }
    )
    .max(MAX_DESCRIPTION_LENGTH, 'Please answer this question'),
});
