import { usePersonality } from '../context/PersonalityContext';
import { heroSequences } from '../animations/sequences';

export function useAnimationSequence() {
  const personality = usePersonality();
  return heroSequences[personality] || heroSequences.calmFormal;
}
