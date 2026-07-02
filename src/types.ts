export type Tab = 'inicio' | 'rescate' | 'masaje' | 'bonos' | 'progreso';

export interface DiagnosticData {
  distressLevel: number;
  mealType: 'pesada' | 'rapida' | 'normal' | null;
  symptoms: string[];
}

export interface Pose {
  id: string;
  name: string;
  subtitle: string;
  target: string;
  image: string;
  benefit: string;
  steps: string[];
}

export interface Elixir {
  id: string;
  title: string;
  icon: string;
  benefits: string;
  steps: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  protein?: {
    label: string;
    icon: string;
  };
  ingredients?: string[];
  steps: {
    title: string;
    text: string;
  }[];
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  info: string;
  icon: string;
  linkText: string;
  tags?: string[];
}

export interface LogEntry {
  id: string;
  date: string;
  type: string;
  label: string;
  intensityBefore: number;
  intensityAfter: number;
  notes: string;
  relief: number;
  dateStr: string;
}
