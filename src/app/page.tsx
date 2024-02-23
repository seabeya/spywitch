import IconSpyWitch from '@/components/icons/IconSpyWitch';

function Paragraph({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-center text-sm text-gray-300  ${className}`}>{children}</p>;
}

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center gap-2 rounded-md border border-c_border1 bg-c_body px-5 pb-8 pt-5">
        <IconSpyWitch className="h-24 w-24 shrink-0" />
        <h1 className="text-base text-gray-100 xl:text-xl">
          Spy<b>Witch</b>
        </h1>
        <Paragraph className="xl:text-base">{`An open source tool to track users' chat messages on Twitch.tv`}</Paragraph>
        <Paragraph>
          {`SpyWitch allows you to track anyone on the platform in any channel, showing you every message they type and
          when, while you are tracking them.`}
        </Paragraph>
      </div>
      <p className="mt-2 text-xs text-gray-400 xl:text-sm">
        *SpyWitch was created for Twitch channel moderation purposes in response to requests from many channel
        moderators.
      </p>
    </div>
  );
}
