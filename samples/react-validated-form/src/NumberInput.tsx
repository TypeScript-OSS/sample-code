import React from 'react';
import { Binding, useBinding, useBindingEffect } from 'react-bindings';
import { ValidationResult } from 'react-validatables';
import { Waitable } from 'react-waitables';

import { TextInput } from './TextInput';

export interface NumberInputProps {
  value: Binding<number | undefined>;
  validator?: Waitable<ValidationResult>;
}

/** A bound number input.  This both controls and reflects the value of the specified binding. */
export const NumberInput = ({ value, validator }: NumberInputProps) => {
  const textValue = useBinding(() => '', { id: 'textValue', detectChanges: true });

  useBindingEffect(value, (value) => textValue.set(value !== undefined ? String(value) : ''), { triggerOnMount: true });

  useBindingEffect(textValue, (textValue) => {
    textValue = textValue.trim();

    const numericValue = textValue.length > 0 ? Number(textValue) : undefined;

    value.set(numericValue !== undefined && !isNaN(numericValue) && isFinite(numericValue) ? numericValue : undefined);
  });

  return <TextInput value={textValue} validator={validator} />;
};
