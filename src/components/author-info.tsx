function AuthorInfo() {
  return (
    <div className="flex flex-col gap-1 text-center text-xs text-c-secondary-text/75">
      <p>
        {'If you like the project, you can show your support by giving a '}
        <a href="https://github.com/seabeya/spywitch" target="_blank" className="underline hover:text-c-primary-text">
          GitHub star
        </a>
        {'. It is free and helps me a lot.'}
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
