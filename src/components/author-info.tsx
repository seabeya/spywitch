function AuthorInfo() {
  return (
    <div className="hidden flex-col gap-1 text-center text-xs text-c-secondary-text/75 lg:flex lg:px-5 xl:px-0">
      <p>
        {'If you liked the project, you can show your support by giving a '}
        <a href="https://github.com/seabeya/spywitch" target="_blank" className="underline hover:text-c-primary-text">
          GitHub star
        </a>
        {". It's free and helps me a lot."}
      </p>
      <p suppressHydrationWarning>
        {`© ${new Date().getFullYear()} Sha'an Aliyev / `}
        <a href="https://www.seabeya.com/" target="_blank" className="underline hover:text-c-primary-text">
          seabeya.com
        </a>
      </p>
    </div>
  );
}

export default AuthorInfo;
