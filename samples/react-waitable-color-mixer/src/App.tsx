import { mix } from 'polished';
import React from 'react';
import { BindingsConsumer, useBinding, useBindingEffect, useDerivedBinding } from 'react-bindings';
import { useDerivedWaitable, WaitablesConsumer } from 'react-waitables';

import { ColorDataSource, colorDataSources } from './color-data-source';
import { ColorBox } from './ColorBox';
import { RangeInput } from './RangeInput';
import { SelectInput } from './SelectInput';
import { useColorData } from './use-color-data';

export const App = () => {
  /**
   * The source of the color data, either `'local'` or `'remote'`.
   *
   * @defaultValue `'local'`
   */
  const colorDataSource = useBinding<ColorDataSource | undefined>(() => 'local', { id: 'colorDataSource', detectChanges: true });
  /** The color data, which may be loaded from a remote source or come from a local constant */
  const colorData = useColorData({ source: colorDataSource });

  /** The color names derived by extracted the keys of the color values dictionary once it's loaded */
  const colorNames = useDerivedWaitable({ colorData }, ({ colorData }) => Object.keys(colorData).sort(), { id: 'colorNames' });

  /** A selected color name */
  const colorName1 = useBinding<string | undefined>(() => undefined, { id: 'colorName1', detectChanges: true });
  /** A selected color name */
  const colorName2 = useBinding<string | undefined>(() => undefined, { id: 'colorName2', detectChanges: true });
  /** The weight to mix the selected input colors.  0 means fully color 1; 1 means fully color 2 */
  const weight = useBinding<number>(() => 0.5, { id: 'weight', detectChanges: true });

  /** A selected color's value */
  const color1 = useDerivedBinding(
    { colorData: colorData.value, colorName1 },
    ({ colorData, colorName1 }) => colorData?.[colorName1 ?? ''] ?? '#fff',
    { id: 'color1' }
  );
  /** A selected color's value */
  const color2 = useDerivedBinding(
    { colorData: colorData.value, colorName2 },
    ({ colorData, colorName2 }) => colorData?.[colorName2 ?? ''] ?? '#fff',
    { id: 'color2' }
  );

  /** The resulting mixed color value derived from the 2 colors and the weight between them */
  const mixedColor = useDerivedBinding({ color1, color2, weight }, ({ color1, color2, weight }) => mix(weight, color2, color1), {
    id: 'mixedColor'
  });

  // If the color data source changes, clear the selected color names since they are probably not compatible
  useBindingEffect(colorDataSource, () => {
    colorName1.set(undefined);
    colorName2.set(undefined);
  });

  return (
    <>
      <div>
        Color Data Source: <SelectInput options={colorDataSources} value={colorDataSource} />
      </div>
      <WaitablesConsumer dependencies={{ colorNames }} ifLoading={() => 'loading…'} ifError={() => 'something went wrong'}>
        {({ colorNames }) => (
          <>
            <div>
              Color 1: <SelectInput options={colorNames} value={colorName1} /> <ColorBox color={color1} />
            </div>
            <div>
              Color 2: <SelectInput options={colorNames} value={colorName2} /> <ColorBox color={color2} />
            </div>

            {/* Shows the mixer and resulting mixed color as long as the user has selected values for both color options */}
            <BindingsConsumer bindings={{ colorName1, colorName2 }}>
              {({ colorName1, colorName2 }) =>
                colorName1 !== undefined && colorName2 !== undefined ? (
                  <>
                    <div>
                      Weight: <RangeInput min={0} max={1} step={0.01} value={weight} />
                    </div>
                    <div>
                      Mixed Color: <ColorBox color={mixedColor} />
                    </div>
                  </>
                ) : null
              }
            </BindingsConsumer>
          </>
        )}
      </WaitablesConsumer>
    </>
  );
};
