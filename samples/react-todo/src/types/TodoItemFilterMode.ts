import { makeStringSubtypeArray, schema } from 'yaschema';

export const todoItemFilterModes = makeStringSubtypeArray('all', 'completed', 'incomplete');
export type TodoItemFilterMode = (typeof todoItemFilterModes)[0];

export const todoItemFilterModeSchema = schema.string(...todoItemFilterModes);
