import StatusItem from './status-item';

function Statusbar() {
  return (
    <div className="overflow-hidden rounded-lg border border-c-line bg-c-fg">
      <div className="grid grid-cols-3 divide-x divide-c-line-high border-b border-c-line-high bg-c-secondary pt-s-gap">
        <StatusItem label={'Users'} data={'0'} />
        <StatusItem label={'Channels'} data={'0'} />
        <StatusItem label={'Up Time'} data={'00:00'} />
      </div>
      <div className="flex items-center justify-center p-6 text-c-secondary-text">Idle</div>
    </div>
  );
}

export default Statusbar;
