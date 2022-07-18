import React from 'react';
import { BindingsConsumer, useBinding, useDerivedBinding } from 'react-bindings';
import {
  changeStringTrim,
  checkEquals,
  checkNumberGTE,
  checkNumberIsInteger,
  checkNumberLT,
  checkStringNotEmpty,
  finalizeValidation,
  preventUndefined,
  selectValue,
  useValidator
} from 'react-validatables';
import { WaitablesConsumer } from 'react-waitables';

import { CheckboxInput } from './CheckboxInput';
import { NumberInput } from './NumberInput';
import { TextInput } from './TextInput';

const makeRequiredStringChecker = () => changeStringTrim(checkStringNotEmpty('Required'));

const makeAgeValidator = () =>
  preventUndefined(
    [checkNumberIsInteger('Must not be fractional'), checkNumberGTE(0, 'Must be >= 0'), checkNumberLT(200, 'Must be < 200')],
    'Required'
  );

const fieldStyle = { display: 'flex', alignItems: 'center', marginBottom: '1em' };

export const App = () => {
  const firstName = useBinding(() => '', { id: 'firstName', detectChanges: true });
  const firstNameValidator = useValidator(firstName, makeRequiredStringChecker, { disabledWhileUnmodified: firstName });

  const lastName = useBinding(() => '', { id: 'lastName', detectChanges: true });
  const lastNameValidator = useValidator(lastName, makeRequiredStringChecker, { disabledWhileUnmodified: lastName });

  const askAge = useBinding(() => false, { id: 'askAge', detectChanges: true });
  const age = useBinding<number | undefined>(() => undefined, { id: 'age', detectChanges: true });
  const ageValidator = useValidator(age, makeAgeValidator, { disabledUntil: askAge, disabledWhileUnmodified: age });

  const favoriteNumber = useBinding<number | undefined>(() => undefined, { id: 'favoriteNumber', detectChanges: true });

  const magicNumber = useDerivedBinding(
    { age, askAge, favoriteNumber },
    ({ age, askAge, favoriteNumber }) => ((askAge ? age ?? 0 : 0) + 1) * (favoriteNumber ?? 0),
    { id: 'validation' }
  );

  const guessedMagicNumber = useBinding<number | undefined>(() => undefined, { id: 'guessedMagicNumber', detectChanges: true });
  const magicNumberValidator = useValidator(
    { magicValidationNumber: magicNumber, guessedMagicNumber },
    ({ magicValidationNumber, guessedMagicNumber }) =>
      selectValue(guessedMagicNumber, preventUndefined(checkEquals(magicValidationNumber))),
    { disabledWhileUnmodified: [favoriteNumber, guessedMagicNumber] }
  );

  const formValidator = useValidator(
    [firstNameValidator, lastNameValidator, ageValidator, magicNumberValidator],
    (validators) => validators
  );

  const onDoneClick = () =>
    finalizeValidation(formValidator, {
      bindings: { firstName, lastName, age, favoriteNumber, guessedMagicNumber },
      onValid: ({ firstName, lastName, age, favoriteNumber, guessedMagicNumber }) => {
        alert(`You did it! ${firstName} ${lastName} ${age ?? ''} ${favoriteNumber ?? ''} ${guessedMagicNumber ?? ''}`);
      }
    });

  return (
    <>
      <div style={fieldStyle}>
        First Name:&nbsp;
        <TextInput value={firstName} validator={firstNameValidator} />
      </div>
      <div style={fieldStyle}>
        Last Name:&nbsp;
        <TextInput value={lastName} validator={lastNameValidator} />
      </div>
      <div style={fieldStyle}>
        Enter Age:&nbsp;
        <CheckboxInput value={askAge} />
      </div>
      <BindingsConsumer bindings={askAge}>
        {(askAge) =>
          askAge ? (
            <div style={fieldStyle}>
              Age:&nbsp;
              <NumberInput value={age} validator={ageValidator} />
            </div>
          ) : null
        }
      </BindingsConsumer>
      <div style={fieldStyle}>
        Favorite Number:&nbsp;
        <NumberInput value={favoriteNumber} />
      </div>
      <div style={fieldStyle}>
        Guess Magic Number:&nbsp;
        <NumberInput value={guessedMagicNumber} validator={magicNumberValidator} />
        &nbsp;= (age + 1) × favorite number, where age = 0 if unspecified
      </div>

      <WaitablesConsumer dependencies={formValidator}>
        {{
          always: (formValidator) => (
            <button disabled={formValidator?.isValid !== true} onClick={onDoneClick}>
              Done
            </button>
          )
        }}
      </WaitablesConsumer>
    </>
  );
};
