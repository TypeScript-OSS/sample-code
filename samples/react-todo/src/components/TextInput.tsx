import React, { ChangeEventHandler, KeyboardEventHandler, useCallback } from 'react';
import { Binding, BindingsConsumer, resolveTypeOrDeferredType } from 'react-bindings';
import { ValidationResult } from 'react-validatables';
import { Waitable, WaitablesConsumer } from 'react-waitables';

export interface TextInputProps {
  value: Binding<string>;
  validator?: Waitable<ValidationResult>;
  placeholder?: string;
  onEnterPressed?: () => void;
}

/** A bound text input.  This both controls and reflects the value of the specified binding. */
export const TextInput = ({ value, validator, placeholder, onEnterPressed }: TextInputProps) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => value.set(event.target.value), [value]);

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.code === 'Enter') {
        onEnterPressed?.();
      }
    },
    [onEnterPressed]
  );

  return (
    <div style={{ display: 'inline-block' }}>
      <div>
        <BindingsConsumer bindings={{ value }} limitType="none">
          {({ value }) => <input type="text" value={value} placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} />}
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
