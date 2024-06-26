import React, { useCallback } from 'react';
import { lockAllBindings, useBinding, useBindingEffect } from 'react-bindings';
import type { TypeOrPromisedType } from 'react-waitables';

import type { TodoItem } from '../types/TodoItem';
import { CheckboxInput } from './CheckboxInput';
import { TaskListItemTitle } from './TaskListItemTitle';

export interface TaskListItemProps {
  item: TodoItem;

  onChange?: (newItem: TodoItem) => TypeOrPromisedType<void>;
  onRemove?: (itemId: string) => TypeOrPromisedType<void>;
}

export const TaskListItem = ({ item, onChange, onRemove }: TaskListItemProps) => {
  const isComplete = useBinding(() => item.isComplete, { id: 'isComplete' });
  const title = useBinding(() => item.title, { id: 'title' });

  const saveChanges = useCallback(async () => {
    const unlock = lockAllBindings([isComplete, title]);
    try {
      await onChange?.({ ...item, isComplete: isComplete.get(), title: title.get() });
    } finally {
      unlock();
    }
  }, [isComplete, item, onChange, title]);

  const onRemoveClick = useCallback(() => onRemove?.(item.id), [item, onRemove]);

  const onEnterPressed = useCallback(() => saveChanges(), [saveChanges]);

  useBindingEffect(isComplete, saveChanges);

  useBindingEffect(title, saveChanges, { limitMSec: 1000 });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CheckboxInput value={isComplete} />
      <TaskListItemTitle title={title} onEnterPressed={onEnterPressed} />
      <button onClick={onRemoveClick}>x</button>
    </div>
  );
};
