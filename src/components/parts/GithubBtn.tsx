import IconGithub from '../icons/IconGithub';

export default function GithubBtn() {
  return (
    <a
      href="https://github.com/seabeya/spywitch"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md border border-gray-700 bg-gray-900 px-2 py-1 text-sm text-gray-300 duration-75 hover:bg-gray-800 hover:text-white sm:px-3 sm:text-base"
    >
      <IconGithub className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
      GitHub
    </a>
  );
}
