import React from 'react';
import type { Binding, ReadonlyBinding } from 'react-bindings';
import { BindingsConsumer, useDerivedBinding } from 'react-bindings';
import type { TypeOrPromisedType } from 'react-waitables';

import type { TodoItem } from '../types/TodoItem';
import type { TodoItemFilterMode } from '../types/TodoItemFilterMode';
import { TaskFilterControl } from './TaskFilterControl';

export interface TaskListControlsProps {
  items: ReadonlyBinding<TodoItem[]>;
  filter: Binding<TodoItemFilterMode>;

  onClearCompletedClick?: () => TypeOrPromisedType<void>;
}
export const TaskListControls = ({ items, filter, onClearCompletedClick }: TaskListControlsProps) => {
  const numIncompleteItems = useDerivedBinding(items, (items) => items.filter((item) => !item.isComplete).length, {
    id: 'numIncompleteItems'
  });
  const numCompletedItems = useDerivedBinding(
    { items, numIncompleteItems },
    ({ items, numIncompleteItems }) => items.length - numIncompleteItems,
    { id: 'numCompletedItems' }
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>
        <BindingsConsumer bindings={numIncompleteItems}>{(numIncompleteItems) => numIncompleteItems}</BindingsConsumer>
        &nbsp;item(s) left
      </span>
      <div style={{ width: '4em' }} />
      <TaskFilterControl filter={filter} />
      <div style={{ width: '4em' }} />
      <BindingsConsumer bindings={numCompletedItems}>
        {(numCompletedItems) => (numCompletedItems > 0 ? <button onClick={onClearCompletedClick}>Clear Completed Items</button> : null)}
      </BindingsConsumer>
    </div>
  );
};
