import React, { ChangeEventHandler, useCallback } from 'react';
import {
  Binding,
  BindingsConsumer,
  ifBinding,
  resolveTypeOrDeferredTypeOrBindingType,
  TypeOrDeferredTypeOrBindingType
} from 'react-bindings';

export interface SelectInputProps<T extends string = string> {
  /** Options either provided in a binding, as the result of a function call, or directly */
  options: TypeOrDeferredTypeOrBindingType<T[]>;

  /** The selected value */
  value: Binding<T | undefined>;
}

/** A bound select input with potentially dynamic options */
export const SelectInput = <T extends string = string>({ options, value }: SelectInputProps<T>) => {
  const onChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => value.set(event.target.value !== '' ? (event.target.value as T) : undefined),
    [value]
  );

  return (
    <BindingsConsumer bindings={{ options: ifBinding(options), value }}>
      {({ value: selectedValue }) => (
        <select value={selectedValue ?? ''} onChange={onChange}>
          <option value="" />

          {resolveTypeOrDeferredTypeOrBindingType(options).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      )}
    </BindingsConsumer>
  );
};
