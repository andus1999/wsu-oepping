export default function getString(stringId, lang = 'en') {
  const strings = {
    appName: {
      en: 'jag',
    },
    signIn: {
      en: 'Sign in',
    },
    signUp: {
      en: 'Sign up',
    },
  };
  return strings[stringId][lang]
}