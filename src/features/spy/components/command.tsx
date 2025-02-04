'use client';

import FieldLabel from '@/components/field-label';
import { MODES } from '@/system/spy';
import { useModeStore } from '@/system/store';
import { Fragment } from 'react';
import Field from './field';
import Items from './items';
import CommandBtn from './command-btn';

function Command() {
  const currentMode = useModeStore();

  return (
    <div className="flex flex-col gap-s-gap">
      {MODES.map((mode) => {
        if (currentMode === mode.name) {
          return mode.fields.map((field, i, arr) => {
            return (
              <Fragment key={i}>
                <FieldLabel title={field.name} hint={field.hint}>
                  <Field name={field.name} type={field.type} placeholder={field.placeholder}>
                    <Items name={field.name} />
                  </Field>
                </FieldLabel>
                {i === arr.length - 1 && <CommandBtn />}
              </Fragment>
            );
          });
        }
      })}
    </div>
  );
}

export default Command;
