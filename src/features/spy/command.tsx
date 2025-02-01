import CommandBtn from './command-btn';
import CommandForm from './command-form';

function Command() {
  return (
    <div className="flex flex-col gap-s-gap">
      <CommandForm />
      <CommandBtn />
    </div>
  );
}

export default Command;
