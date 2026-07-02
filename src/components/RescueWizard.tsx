import { useState, useEffect } from 'react';
import { DiagnosticData } from '../types';
import RescueBreathingStep from './RescueBreathingStep';
import RescueYogaStep from './RescueYogaStep';
import RescueMassageStep from './RescueMassageStep';
import RescueElixirsStep from './RescueElixirsStep';
import RescueRecipesStep from './RescueRecipesStep';

interface RescueWizardProps {
  diagnosticData: DiagnosticData | null;
  onFinishRescue: (intensityBefore: number, intensityAfter: number, notes: string, reliefRate: number) => void;
  onNavigateHome: () => void;
  initialStep?: number;
}

export default function RescueWizard({
  diagnosticData,
  onFinishRescue,
  onNavigateHome,
  initialStep = 1
}: RescueWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  // Sync state with prop if user navigates tabs
  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  // Submit and open evaluations modal
  const handleFinalize = () => {
    // We send diagnostic distress level as original intensity, and let evaluation choose the after intensity
    const distressBefore = diagnosticData?.distressLevel || 5;
    onFinishRescue(distressBefore, 3, '', 0); // Trigger evaluations portal directly
  };

  return (
    <div className="pb-32 animate-fade-in text-on-surface">
      {/* Top Header Stepper */}
      <section className="mb-6 bg-surface-container-low rounded-2xl p-4 border border-primary/10">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-sans font-bold text-xs">
            Paso {currentStep} de 5
          </span>
          <span className="text-on-surface-variant font-sans font-semibold text-xs">
            Protocolo de Rescate Activo
          </span>
        </div>
        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${currentStep * 20}%` }}
          />
        </div>
      </section>

      {/* Render current step based on active step number */}
      {currentStep === 1 && (
        <RescueBreathingStep onNext={() => setCurrentStep(2)} />
      )}

      {currentStep === 2 && (
        <RescueYogaStep 
          diagnosticData={diagnosticData} 
          onNext={() => setCurrentStep(3)} 
        />
      )}

      {currentStep === 3 && (
        <RescueMassageStep onNext={() => setCurrentStep(4)} />
      )}

      {currentStep === 4 && (
        <RescueElixirsStep onNext={() => setCurrentStep(5)} />
      )}

      {currentStep === 5 && (
        <RescueRecipesStep 
          diagnosticData={diagnosticData} 
          onNavigateHome={onNavigateHome} 
          onFinalizeRescue={handleFinalize} 
        />
      )}
    </div>
  );
}
