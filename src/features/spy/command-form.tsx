'use client';

import FieldLabel from '@/components/field-label';
import { MODES } from '@/system/spy';
import Input from './input';
import InputItems from './input-items';
import { useModeStore } from '@/system/store';

function CommandForm() {
  const currentMode = useModeStore();

  return MODES.map((mode) => {
    if (currentMode === mode.name) {
      return mode.fields.map((field, i) => {
        return (
          <FieldLabel key={i} title={field.name} hint={field.hint}>
            <Input name={field.name} type={field.type} placeholder={field.placeholder}>
              <InputItems name={field.name} />
            </Input>
          </FieldLabel>
        );
      });
    }
  });
}

export default CommandForm;
