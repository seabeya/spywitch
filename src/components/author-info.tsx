function AuthorInfo() {
  return (
    <div className="hidden flex-col gap-1 text-balance text-center text-xs text-c-secondary-text/75 lg:flex">
      <p>
        {'If you liked the project, you can show your support by giving a '}
        <a href="https://github.com/sh2aliyev/spywitch" target="_blank" className="underline hover:text-c-primary-text">
          GitHub star
        </a>
        {". It's free and helps me a lot."}
      </p>
      <p suppressHydrationWarning>
        {`© ${new Date().getFullYear()} Sha'an Aliyev / `}
        <a href="https://sh2a.org/" target="_blank" className="underline hover:text-c-primary-text">
          sh2a.org
        </a>
      </p>
    </div>
  );
}

export default AuthorInfo;
