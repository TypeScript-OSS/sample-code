import React, { useMemo } from 'react';
import { useBinding } from 'react-bindings';

import { TextInput } from './TextInput.js';

/**
 * Creates a memo'd object with a value binding and a "Field" component for rendering the input.
 *
 * See Method 2 in App.tsx
 */
export const useTextInput = ({ id }: { id: string }) => {
  const value = useBinding(() => '', { id });

  return useMemo(() => ({ Field: () => <TextInput value={value} />, value }), [value]);
};
