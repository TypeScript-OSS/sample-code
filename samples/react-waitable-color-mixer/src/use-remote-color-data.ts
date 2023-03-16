import type { UseWaitableArgs } from 'react-waitables';
import { useWaitableFunction } from 'react-waitables';

/** Loads color data from https://raw.githubusercontent.com/bahamas10/css-color-names/master/css-color-names.json */
export const useRemoteColorData = (fwd: Omit<UseWaitableArgs<Record<string, string>>, 'id'> & { id?: string }) =>
  useWaitableFunction<Record<string, string>>(
    async () => {
      // Artificially delaying loading by 1 second to make sure it's noticeable
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await fetch('https://raw.githubusercontent.com/bahamas10/css-color-names/master/css-color-names.json');
        // Not performing runtime validation for simplicity in this example
        const data = (await response.json()) as Record<string, string> | undefined;
        if (data !== undefined) {
          return { ok: true, value: data };
        } else {
          return { ok: false, value: { status: response.status } };
        }
      } catch (error) {
        return { ok: false, value: { error } };
      }
    },
    { id: 'remoteColorData', ...fwd }
  );
