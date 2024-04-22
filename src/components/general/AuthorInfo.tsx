export default function AuthorInfo() {
  return (
    <div className="hidden px-4 text-center text-xs text-txt-lower lg:block">
      <p>
        If you like the project, you can show your support by giving a{' '}
        <a href="https://github.com/seabeya/spywitch" target="_blank" rel="noopener noreferrer" className="underline">
          GitHub star
        </a>
        . It's free and helps me a lot.
      </p>
      <div className="mt-1 inline-flex gap-1">
        <p suppressHydrationWarning={true}>{`© ${new Date().getFullYear()} Sha'an Aliyev`}</p>
        <span>/</span>
        <a href="https://www.seabeya.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          seabeya.com
        </a>
      </div>
    </div>
  );
}
