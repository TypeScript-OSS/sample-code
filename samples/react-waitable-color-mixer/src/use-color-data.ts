import { ReadonlyBinding, useDerivedBinding } from 'react-bindings';
import { useDerivedWaitable } from 'react-waitables';

import { ColorDataSource } from './color-data-source';
import { LOCAL_COLORS } from './local-color-data';
import { useRemoteColorData } from './use-remote-color-data';

export const useColorData = ({ source }: { source: ReadonlyBinding<ColorDataSource | undefined> }) => {
  const isSourceRemote = useDerivedBinding({ source }, ({ source }) => source === 'remote', { id: 'isSourceRemote' });

  /**
   * The remote data, which is locked -- so it wont load -- until the user has indicated they are interested in this data.  However, this
   * provides a default value, an empty object, which we'll use to determine if it's still loading or not
   */
  const remoteColorData = useRemoteColorData({ lockedUntil: isSourceRemote, defaultValue: () => ({}) });

  return useDerivedWaitable(
    { remoteColorData, source },
    ({ remoteColorData, source }) => {
      switch (source ?? 'local') {
        case 'local':
          return LOCAL_COLORS;

        case 'remote':
          // Treating an empty object as a loading state, since that's coming from the default value
          return Object.keys(remoteColorData).length > 0 ? remoteColorData : undefined;
      }
    },
    { id: 'colorData' }
  );
};
