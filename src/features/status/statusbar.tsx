import StatusItem from './status-item';

function Statusbar() {
  return (
    <div className="overflow-hidden rounded-lg border border-c-line bg-c-fg">
      <div className="grid auto-cols-fr grid-flow-col divide-x divide-c-line-high bg-c-secondary sm:pt-s-gap lg:border-b lg:border-c-line-high">
        <StatusItem label={'Users'} data={'0'} />
        <StatusItem label={'Channels'} data={'0'} />
        <StatusItem label={'Up Time'} data={'00:00'} />
      </div>
      <div className="hidden items-center justify-center p-6 text-c-secondary-text lg:flex">Idle</div>
    </div>
  );
}

export default Statusbar;
