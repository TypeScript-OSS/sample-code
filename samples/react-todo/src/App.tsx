import React, { useCallback } from 'react';
import { BindingsConsumer, useBinding } from 'react-bindings';
import { v4 as uuid } from 'uuid';

import { AppTitle } from './components/AppTitle';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { TaskListControls } from './components/TaskListControls';
import { useConnectBindingWithLocalStorage } from './hooks/useConnectBindingWithLocalStorage';
import { TodoItem, todoItemsSchema } from './types/TodoItem';
import { TodoItemFilterMode, todoItemFilterModeSchema } from './types/TodoItemFilterMode';

export const App = () => {
  const items = useBinding<TodoItem[]>(() => [], { id: 'items' });
  useConnectBindingWithLocalStorage(items, 'react-todo:list', todoItemsSchema);

  const filter = useBinding<TodoItemFilterMode>(() => 'all', { id: 'filter' });
  useConnectBindingWithLocalStorage(filter, 'react-todo:filter-mode', todoItemFilterModeSchema);

  const onTaskEntered = useCallback((title: string) => items.set([...items.get(), { id: uuid(), isComplete: false, title }]), [items]);

  const onItemChange = useCallback(
    (newItem: TodoItem) => items.set(items.get().map((item) => (newItem.id === item.id ? newItem : item))),
    [items]
  );

  const onItemRemove = useCallback((itemId: string) => items.set(items.get().filter((item) => itemId !== item.id)), [items]);

  const onClearCompletedClick = useCallback(() => items.set(items.get().filter((item) => !item.isComplete)), [items]);

  return (
    <>
      <AppTitle />
      <TaskInput onTaskEntered={onTaskEntered} />
      <TaskList items={items} filter={filter} onItemChange={onItemChange} onItemRemove={onItemRemove} />
      <BindingsConsumer bindings={items} makeComparableInputValue={() => items.length > 0}>
        {(items, itemsBinding) =>
          items.length > 0 ? <TaskListControls items={itemsBinding} filter={filter} onClearCompletedClick={onClearCompletedClick} /> : null
        }
      </BindingsConsumer>
    </>
  );
};
