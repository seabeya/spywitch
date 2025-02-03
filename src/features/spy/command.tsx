import CommandBtn from './command-btn';
import CommandFields from './command-fields';

function Command() {
  return (
    <div className="flex flex-col gap-s-gap">
      <CommandFields />
      <CommandBtn />
    </div>
  );
}

export default Command;
