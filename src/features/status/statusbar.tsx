import DataItems from './data-items';
import DataStatus from './data-status';
import DataTime from './data-time';

function Statusbar() {
  return (
    <div className="overflow-hidden rounded-lg border border-c-line bg-c-fg">
      <div className="grid auto-cols-fr grid-flow-col divide-x divide-c-line-high bg-c-secondary sm:pt-s-gap lg:border-b lg:border-c-line-high">
        <DataItems />
        <DataTime />
      </div>
      <DataStatus />
    </div>
  );
}

export default Statusbar;
