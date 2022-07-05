import React from 'react';
import { BindingsConsumer, ifBinding, resolveTypeOrBindingType, TypeOrBindingType } from 'react-bindings';

export interface ColorBoxProps {
  /** The color can be provided either as a binding or directly */
  color: TypeOrBindingType<string | undefined>;
}

/** Shows a color swatch and the string representation of the color */
export const ColorBox = ({ color }: ColorBoxProps) => (
  <BindingsConsumer bindings={{ color: ifBinding<string | undefined>(color) }}>
    {/* If the color is provided in a binding and the value isn't undefined, the binding's value will be used.  Otherwise, this gets the
    value directly.  If the binding's value is undefined, this will actually read the value twice, but that's ok for the convenience of
    inlining everything.  If the final resolved value would be undefined, then `'#fff'` is used instead. */}
    {({ color: resolvedColor = resolveTypeOrBindingType(color) ?? '#fff' }) => (
      <>
        <span
          style={{
            display: 'inline-block',
            backgroundColor: resolvedColor,
            width: '22px',
            height: '22px',
            border: '1px solid #000',
            borderRadius: '11px',
            boxSizing: 'border-box'
          }}
        />
        &nbsp;
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'monospace'
          }}
        >
          {resolvedColor}
        </span>
      </>
    )}
  </BindingsConsumer>
);
