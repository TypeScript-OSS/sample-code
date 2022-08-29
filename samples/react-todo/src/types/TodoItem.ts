import { schema } from 'yaschema';

export const todoItemSchema = schema.object({
  id: schema.string(),
  isComplete: schema.boolean(),
  title: schema.string().allowEmptyString()
});
export const todoItemsSchema = schema.array({ items: todoItemSchema });

export type TodoItem = typeof todoItemSchema.valueType;
