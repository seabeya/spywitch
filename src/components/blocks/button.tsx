import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const variants = cva('whitespace-nowrap flex items-center justify-center rounded-sm text-sm shrink-0', {
  variants: {
    variant: {
      outline: 'text-c-secondary-text',
      ghost: 'text-c-secondary-text',
    },
    size: {
      header: 'h-8 px-s-gap ',
    },
    border: {
      low: 'border',
      mid: 'border',
    },
  },
  compoundVariants: [
    // border: outline, ghost
    {
      variant: 'outline',
      border: 'low',
      class: 'border-c-line-low hover:border-c-line',
    },
    {
      variant: 'outline',
      border: 'mid',
      class: 'border-c-line hover:border-c-line-high',
    },
    {
      variant: 'ghost',
      border: 'low',
      class: 'border-transparent hover:border-c-line-low',
    },
    {
      variant: 'ghost',
      border: 'mid',
      class: 'border-transparent hover:border-c-line',
    },
  ],
});

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof variants> {
  children: React.ReactNode;
}

function Button({ variant, size, border, className, ...props }: ButtonProps) {
  return <button className={cn(variants({ variant, size, border, className }))} {...props} />;
}

interface ButtonLinkProps extends React.ComponentPropsWithoutRef<'a'>, VariantProps<typeof variants> {
  href: string;
  children: React.ReactNode;
}

function ButtonLink({ variant, size, border, className, href, ...props }: ButtonLinkProps) {
  return <Link href={href} className={cn(variants({ variant, size, border, className }))} {...props} />;
}

Button.Link = ButtonLink;

export default Button;
