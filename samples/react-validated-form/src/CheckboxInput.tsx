import React, { ChangeEventHandler, useCallback } from 'react';
import { Binding, BindingsConsumer, resolveTypeOrDeferredType } from 'react-bindings';
import { ValidationResult } from 'react-validatables';
import { Waitable, WaitablesConsumer } from 'react-waitables';

export interface CheckboxInputProps {
  value: Binding<boolean>;
  validator?: Waitable<ValidationResult>;
}

/** A bound checkbox input.  This both controls and reflects the value of the specified binding. */
export const CheckboxInput = ({ value, validator }: CheckboxInputProps) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => value.set(event.target.checked), [value]);

  return (
    <div style={{ display: 'inline-block' }}>
      <div>
        <BindingsConsumer bindings={{ value }} limitType="none">
          {({ value }) => <input type="checkbox" checked={value} onChange={onChange} />}
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
