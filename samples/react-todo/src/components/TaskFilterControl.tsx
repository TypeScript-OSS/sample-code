import React, { useCallback } from 'react';
import type { Binding } from 'react-bindings';
import { BindingsConsumer } from 'react-bindings';

import type { TodoItemFilterMode } from '../types/TodoItemFilterMode';

export interface TaskFilterControlProps {
  filter: Binding<TodoItemFilterMode>;
}

const selectedButtonStyle: React.CSSProperties = { border: '1px solid blue', borderRadius: '2px', background: 'none' };
const unselectedButtonStyle: React.CSSProperties = { border: '1px solid transparent', borderRadius: '2px', background: 'none' };

export const TaskFilterControl = ({ filter }: TaskFilterControlProps) => {
  const onAllClick = useCallback(() => filter.set('all'), [filter]);
  const onActive = useCallback(() => filter.set('incomplete'), [filter]);
  const onCompletedClick = useCallback(() => filter.set('completed'), [filter]);

  return (
    <BindingsConsumer bindings={filter}>
      {(filter) => (
        <div style={{ display: 'inline-flex', alignItems: 'stretch' }}>
          <button style={filter === 'all' ? selectedButtonStyle : unselectedButtonStyle} onClick={onAllClick}>
            All
          </button>
          <button style={filter === 'incomplete' ? selectedButtonStyle : unselectedButtonStyle} onClick={onActive}>
            Active
          </button>
          <button style={filter === 'completed' ? selectedButtonStyle : unselectedButtonStyle} onClick={onCompletedClick}>
            Completed
          </button>
        </div>
      )}
    </BindingsConsumer>
  );
};
