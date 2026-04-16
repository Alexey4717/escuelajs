import { type ReactNode } from 'react';

import Link from 'next/link';

import { Plus } from 'lucide-react';

import { type OnboardingTargetId } from '@/shared/lib/onboarding';
import { Button } from '@/shared/ui/Button/Button';

interface AddEntityButtonLinkProps {
  href: string;
  children: ReactNode;
  onboardingTarget?: OnboardingTargetId;
}

export const AddEntityButtonLink = ({
  href,
  children,
  onboardingTarget,
}: AddEntityButtonLinkProps) => {
  return (
    <Button
      className="h-[200px] w-full flex-col gap-4 text-2xl font-semibold lg:text-3xl"
      asChild
      variant="outline"
    >
      <Link
        className="flex flex-row items-center justify-center gap-2"
        href={href}
        data-onboarding={onboardingTarget}
      >
        <Plus className="size-8 lg:size-10" />
        <span className="whitespace-normal text-center block w-fit">
          {children}
        </span>
      </Link>
    </Button>
  );
};
