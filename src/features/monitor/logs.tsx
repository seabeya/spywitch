import { useEffect, useState } from 'react';
import LogsInfo from './logs-info';
import { useSpyStore } from '@/system/store';
import { FilterBy, Log } from '@/system/types';
import ToShow from '@/lib/action/to-show';
import { Virtuoso } from 'react-virtuoso';
import LogItem from './log-item';

interface LogsProps {
  target: string;
  filterBy: FilterBy;
}

function Logs({ target, filterBy }: LogsProps) {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const spy = useSpyStore.getState();
    if (spy === undefined) return;

    // Load data from idb:
    (async () => {
      try {
        setLogs(await spy.idb.getAllFromIndex('logs', spy.idbIndex, target));
      } catch {}
    })();

    // Load live data:
    const handlers = new ToShow(setLogs, target, spy.idbIndex);
    const eventHandlers = spy.setListeners(handlers);

    return () => {
      spy.unsetListeners(eventHandlers);
      setLogs([]);
    };
  }, [target]);

  return (
    <div className="flex flex-col gap-s-gap">
      <LogsInfo target={target} count={logs.length} />
      <div className="relative rounded-md border border-c-line p-2">
        <Virtuoso
          style={{ height: '512px' }}
          className="custom-scrollbar"
          data={logs}
          followOutput={true}
          itemContent={(_, data) => <LogItem data={data} filterBy={filterBy} />}
        />
      </div>
    </div>
  );
}

export default Logs;
