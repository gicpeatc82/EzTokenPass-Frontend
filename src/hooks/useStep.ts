import { useState } from 'react';
import { UseStepState } from './types';

function useStep(): UseStepState {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInitStep = () => {
    setActiveStep(0);
  };

  return { activeStep, handleNext, handleBack, handleInitStep };
}

export default useStep;
