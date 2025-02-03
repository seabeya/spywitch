import { FieldName } from '@/system/spy';
import { useInputStore } from '@/system/store';
import StatusInfo from './status-info';

interface DataItemProps {
  name: FieldName;
}

function DataItem({ name }: DataItemProps) {
  const data = useInputStore((state) => state[name]);

  return <StatusInfo label={name} data={data.length} />;
}

export default DataItem;
