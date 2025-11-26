"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";

interface Props {
  steps: number[];
}

export default function NumberStepper({ steps }: Props) {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className="mx-auto max-w-xl space-y-8 text-center">
      <Stepper onValueChange={setCurrentStep} value={currentStep}>
        {steps.map((step) => (
          <StepperItem className="not-last:flex-1" key={step} step={step}>
            <StepperTrigger asChild>
              <StepperIndicator />
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
      <div className="flex justify-center space-x-4">
        <Button
          className="w-32"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => prev - 1)}
          variant="outline"
        >
          Prev step
        </Button>
        <Button
          className="w-32"
          disabled={currentStep > steps.length}
          onClick={() => setCurrentStep((prev) => prev + 1)}
          variant="outline"
        >
          Next step
        </Button>
      </div>
    </div>
  );
}
