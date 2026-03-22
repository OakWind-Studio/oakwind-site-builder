import { createContext, useContext } from 'react';

const PersonalityContext = createContext('calmFormal');

export function PersonalityProvider({ personality, children }) {
  return (
    <PersonalityContext.Provider value={personality}>
      {children}
    </PersonalityContext.Provider>
  );
}

export function usePersonality() {
  return useContext(PersonalityContext);
}

// Valid personality values:
// calmFormal, calmCasual, energeticBold, energeticCasual,
// subtleElegant, boldConfident, traditionalWarm, modernClean
