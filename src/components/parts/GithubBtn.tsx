import IconGithub from '@/components/icons/IconGithub';

export default function GithubBtn() {
  return (
    <a
      href="https://github.com/seabeya/spywitch"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md border border-c_border1 bg-c_body px-2 py-1 text-sm text-gray-300 duration-75 hover:border-c_border2 hover:bg-gray-800 hover:text-white"
    >
      <IconGithub className="h-4 w-4 shrink-0" />
      GitHub
    </a>
  );
}
