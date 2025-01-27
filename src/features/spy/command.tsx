'use client';

import FieldLabel from '@/components/field-label';
import Input from './input';
import { MODES } from '@/system/spy';
import { useModeStore } from '@/system/store';

function Command() {
  const currentMode = useModeStore();

  return (
    <div className="flex flex-col gap-s-gap">
      {MODES.map((mode) => {
        if (currentMode === mode.name) {
          return mode.fields.map((field, i) => {
            return (
              <FieldLabel key={i} title={field.name} hint={field.hint}>
                <Input name={field.name} type={field.type} placeholder={field.placeholder} />
              </FieldLabel>
            );
          });
        }
      })}
    </div>
  );
}

export default Command;
