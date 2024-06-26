import React from 'react';
import { useBinding } from 'react-bindings';

import { TextInput } from './TextInput.js';

/**
 * Creates a binding that not only stores a value but has extra properties for clearing its value and for rendering the text field as a
 * component.
 *
 * See Method 3 in App.tsx
 */
export const useTextField = ({ id }: { id: string }) =>
  useBinding(() => '', {
    id,
    addFields: (binding) => ({
      /** Renders the text field as a component */
      Component: () => <TextInput value={binding} />,
      /** Clears the text field */
      clear: () => binding.set('')
    })
  });
