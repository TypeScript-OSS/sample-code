import type { ChangeEventHandler } from 'react';
import React, { useCallback } from 'react';
import type { Binding } from 'react-bindings';
import { BindingsConsumer } from 'react-bindings';

export interface RangeInputProps {
  /** The value */
  value: Binding<number>;

  /** @defaultValue `0` */
  min?: number;
  /** @defaultValue `100` */
  max?: number;
  /** @defaultValue `1` */
  step?: number;
}

/** A bound slider control */
export const RangeInput = ({ value, min = 0, max = 100, step = 1 }: RangeInputProps) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => value.set(Number(event.target.value)), [value]);

  return (
    <BindingsConsumer bindings={{ value }}>
      {({ value }) => <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} />}
    </BindingsConsumer>
  );
};
