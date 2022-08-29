import { TodoItem } from '../types/TodoItem';
import { TodoItemFilterMode } from '../types/TodoItemFilterMode';

export const doesTodoItemMatchFilter = (item: TodoItem, filter: TodoItemFilterMode) =>
  filter === 'all' || (filter === 'completed') === item.isComplete;
