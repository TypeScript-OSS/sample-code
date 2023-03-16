import { useRef } from 'react';
import type { Binding } from 'react-bindings';
import { useBindingEffect } from 'react-bindings';
import type { Schema } from 'yaschema';

export const useConnectBindingWithLocalStorage = <T>(binding: Binding<T>, key: string, schema?: Schema<T>) => {
  const isFirstRender = useRef(true);
  if (isFirstRender.current) {
    isFirstRender.current = false;

    try {
      const found = window.localStorage.getItem(key);
      if (found === null) {
        console.debug(`No value found for ${key} in Local Storage`);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parsed = JSON.parse(found);

        if (schema !== undefined) {
          const deserialization = schema.deserialize(parsed);
          if (deserialization.error === undefined) {
            binding.set(deserialization.deserialized);
          } else {
            console.error(`Schema violation for ${key}, ignoring stored value`, deserialization.error);
          }
        } else {
          binding.set(parsed as T);
        }
      }
    } catch (e) {
      console.error(`Failed to read ${key} from Local Storage`, e);
    }
  }

  useBindingEffect(binding, (binding) => {
    try {
      if (schema !== undefined) {
        const serialization = schema.serialize(binding);
        if (serialization.error === undefined) {
          window.localStorage.setItem(key, JSON.stringify(serialization.serialized));
        } else {
          console.error(`Schema violation for ${key}, not storing into Local Storage`, serialization.error);
        }
      } else {
        window.localStorage.setItem(key, JSON.stringify(binding));
      }
    } catch (e) {
      console.error(`Failed to store ${key} into Local Storage`, e);
    }
  });
};
