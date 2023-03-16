import type { ChangeEventHandler } from 'react';
import React, { useCallback } from 'react';
import type { Binding } from 'react-bindings';
import { BindingsConsumer } from 'react-bindings';

export interface TextInputProps {
  value: Binding<string>;
}

/** A bound text input.  This both controls and reflects the value of the specified binding. */
export const TextInput = ({ value }: TextInputProps) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => value.set(event.target.value), [value]);

  return (
    <BindingsConsumer bindings={{ value }} limitType="none">
      {({ value }) => <input type="text" value={value} onChange={onChange} />}
    </BindingsConsumer>
  );
};
