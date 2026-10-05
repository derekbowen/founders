import type { NewJobInput } from './marketplace';

export interface StepProps {
  form: NewJobInput;
  update: (patch: Partial<NewJobInput>) => void;
  errors: Partial<Record<keyof NewJobInput, string>>;
}