import type { TodoItem } from '../types/TodoItem';
import type { TodoItemFilterMode } from '../types/TodoItemFilterMode';

export const doesTodoItemMatchFilter = (item: TodoItem, filter: TodoItemFilterMode) =>
  filter === 'all' || (filter === 'completed') === item.isComplete;
