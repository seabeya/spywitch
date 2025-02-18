import Button from './blocks/button';
import IconGithub from './icons/github';

function GitHubBtn() {
  return (
    <Button.Link
      href="https://github.com/seabeya/spywitch"
      target="_blank"
      variant={'outline'}
      size={'regular'}
      border={'mid'}
      className="gap-1 hover:text-c-primary-text"
    >
      <IconGithub className="size-5 shrink-0" />
      <span>GitHub</span>
    </Button.Link>
  );
}

export default GitHubBtn;
