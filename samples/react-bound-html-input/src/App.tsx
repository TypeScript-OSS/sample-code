import React, { useCallback } from 'react';
import { BindingsConsumer, useBinding } from 'react-bindings';

import { TextInput } from './TextInput';
import { useTextField } from './use-text-field';
import { useTextInput } from './use-text-input';

export const App = () => {
  // For Method 1
  const value = useBinding(() => '', { id: 'value', detectChanges: true });

  const onClear1Click = useCallback(() => value.set(''), [value]);

  // For Method 2
  const inputField = useTextInput({ id: 'myInput' });

  const onClear2Click = useCallback(() => inputField.value.set(''), [inputField]);

  // For Method 3
  const textField = useTextField({ id: 'myTextField' });

  return (
    <>
      <h1>Method 1</h1>
      <p>Create a binding and pass it to a component, which will read and write it</p>
      <div>
        <TextInput value={value} />
        &nbsp;
        <button onClick={onClear1Click}>Clear</button>
      </div>
      <div>
        You entered:&nbsp;
        <BindingsConsumer bindings={{ value }}>{({ value }) => value}</BindingsConsumer>
      </div>

      <hr />

      <h1>Method 2</h1>
      <p>Use a hook to create a conceptual "field" with it's own bound value and renderer</p>
      <div>
        <inputField.Field />
        &nbsp;
        <button onClick={onClear2Click}>Clear</button>
      </div>
      <div>
        You entered:&nbsp;
        <BindingsConsumer bindings={{ value: inputField.value }}>{({ value }) => value}</BindingsConsumer>
      </div>

      <hr />

      <h1>Method 3</h1>
      <p>Use a binding with added "Component" and "clear" fields</p>
      <div>
        <textField.Component />
        &nbsp;
        <button onClick={textField.clear}>Clear</button>
      </div>
      <div>
        You entered:&nbsp;
        <BindingsConsumer bindings={{ textField }}>{({ textField }) => textField}</BindingsConsumer>
      </div>
    </>
  );
};
