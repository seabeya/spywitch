export default function InputError({ message }: { message: string }) {
  return <p className="-mt-1 ml-1 text-xs text-red-600 xl:text-sm">{message}</p>;
}
