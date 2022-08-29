import React from 'react';
import { Binding } from 'react-bindings';

import { TextInput } from './TextInput';

export interface TaskListItemTitleProps {
  title: Binding<string>;

  onEnterPressed?: () => void;
}

export const TaskListItemTitle = ({ title, onEnterPressed }: TaskListItemTitleProps) => {
  return <TextInput value={title} onEnterPressed={onEnterPressed} />;
};
