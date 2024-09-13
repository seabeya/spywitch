import Link from 'next/link';

export default function RunningAppNavigateInfo() {
  return (
    <div className="flex justify-end">
      <p className="text-xs text-green-500 xl:text-sm">
        {'SpyWitch is running. To view chat logs, go to the '}
        <Link href="/logs" className="font-bold text-green-400 hover:underline">
          Logs tab
        </Link>
        .
      </p>
    </div>
  );
}
