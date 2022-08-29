import React, { useCallback } from 'react';
import { useBinding } from 'react-bindings';
import { changeStringTrim, checkStringNotEmpty, useValidator } from 'react-validatables';
import { TypeOrPromisedType } from 'react-waitables';

import { TextInput } from './TextInput';

export interface TaskInputProps {
  onTaskEntered?: (title: string) => TypeOrPromisedType<void | boolean>;
}

export const TaskInput = ({ onTaskEntered }: TaskInputProps) => {
  const value = useBinding(() => '', { id: 'value' });

  const validator = useValidator(value, () => changeStringTrim(checkStringNotEmpty('Must not be empty')), {
    disabledWhileUnmodified: value
  });

  const onEnterPressed = useCallback(async () => {
    let shouldClear = false;

    const unlock = value.lock();
    try {
      const theValue = value.get().trim();
      if (theValue.length === 0) {
        return; // Ignore empty input
      }

      if ((await onTaskEntered?.(theValue)) ?? true) {
        shouldClear = true;
      }
    } finally {
      unlock();
    }

    if (shouldClear) {
      value.set('');
      value.setIsModified(false);
    }
  }, [onTaskEntered, value]);

  return <TextInput value={value} validator={validator} placeholder="What needs to be done?" onEnterPressed={onEnterPressed} />;
};
