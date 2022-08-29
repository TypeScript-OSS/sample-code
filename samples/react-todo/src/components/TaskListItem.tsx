import React, { useCallback } from 'react';
import { lockAllBindings, useBinding, useBindingEffect } from 'react-bindings';
import { TypeOrPromisedType } from 'react-waitables';

import { TodoItem } from '../types/TodoItem';
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

  const onRemoveClick = useCallback(() => onRemove?.(item.id), [item, onRemove]);

  useBindingEffect(isComplete, async (isComplete, isCompleteBinding) => {
    const unlock = lockAllBindings([isCompleteBinding, title]);
    try {
      await onChange?.({ ...item, isComplete, title: title.get() });
    } finally {
      unlock();
    }
  });

  useBindingEffect(title, async () => {
    const unlock = lockAllBindings([isComplete, title]);
    try {
      await onChange?.({ ...item, isComplete: isComplete.get(), title: title.get() });
    } finally {
      unlock();
    }
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CheckboxInput value={isComplete} />
      <TaskListItemTitle title={title} />
      <button onClick={onRemoveClick}>x</button>
    </div>
  );
};
