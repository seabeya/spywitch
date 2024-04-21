import { MessageData } from '@/types';

export default function Log({ data }: { data: MessageData }) {
  return <div>{data.type}</div>;
}
