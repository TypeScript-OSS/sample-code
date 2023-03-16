import type { ChangeEventHandler } from 'react';
import React, { useCallback } from 'react';
import type { Binding } from 'react-bindings';
import { BindingsConsumer, resolveTypeOrDeferredType } from 'react-bindings';
import type { ValidationResult } from 'react-validatables';
import type { Waitable } from 'react-waitables';
import { WaitablesConsumer } from 'react-waitables';

export interface TextInputProps {
  value: Binding<string>;
  validator?: Waitable<ValidationResult>;
}

/** A bound text input.  This both controls and reflects the value of the specified binding. */
export const TextInput = ({ value, validator }: TextInputProps) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => value.set(event.target.value), [value]);

  return (
    <div style={{ display: 'inline-block' }}>
      <div>
        <BindingsConsumer bindings={{ value }} limitType="none">
          {({ value }) => <input type="text" value={value} onChange={onChange} />}
        </BindingsConsumer>
      </div>
      <WaitablesConsumer dependencies={validator}>
        {(validator) =>
          !validator.isValid ? <div style={{ color: 'red' }}>{resolveTypeOrDeferredType(validator.validationError)}</div> : null
        }
      </WaitablesConsumer>
    </div>
  );
};
