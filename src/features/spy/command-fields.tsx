'use client';

import FieldLabel from '@/components/field-label';
import { MODES } from '@/system/spy';
import Field from './field';
import Items from './items';
import { useModeStore } from '@/system/store';

function CommandFields() {
  const currentMode = useModeStore();

  return MODES.map((mode) => {
    if (currentMode === mode.name) {
      return mode.fields.map((field, i) => {
        return (
          <FieldLabel key={i} title={field.name} hint={field.hint}>
            <Field name={field.name} type={field.type} placeholder={field.placeholder}>
              <Items name={field.name} />
            </Field>
          </FieldLabel>
        );
      });
    }
  });
}

export default CommandFields;
