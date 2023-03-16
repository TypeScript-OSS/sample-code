import React from 'react';
import type { ReadonlyBinding } from 'react-bindings';
import { BindingsConsumer, useDerivedBinding } from 'react-bindings';
import type { TypeOrPromisedType } from 'react-waitables';

import type { TodoItem } from '../types/TodoItem';
import type { TodoItemFilterMode } from '../types/TodoItemFilterMode';
import { doesTodoItemMatchFilter } from '../utils/doesTodoItemMatchFilter';
import { TaskListItem } from './TaskListItem';

export interface TaskListProps {
  items: ReadonlyBinding<TodoItem[]>;
  filter: ReadonlyBinding<TodoItemFilterMode>;

  onItemChange?: (newItem: TodoItem) => TypeOrPromisedType<void>;
  onItemRemove?: (itemId: string) => TypeOrPromisedType<void>;
}

export const TaskList = ({ items, filter, onItemChange, onItemRemove }: TaskListProps) => {
  const filteredItems = useDerivedBinding(
    { items, filter },
    ({ items, filter }) => items.filter((item) => doesTodoItemMatchFilter(item, filter)),
    { id: 'filteredItems' }
  );

  return (
    <BindingsConsumer bindings={filteredItems}>
      {(items) => items.map((item) => <TaskListItem key={item.id} item={item} onChange={onItemChange} onRemove={onItemRemove} />)}
    </BindingsConsumer>
  );
};
