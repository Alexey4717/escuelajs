import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export const LoginLoadPage = () => {
  return (
    <div className="flex min-h-[min(100dvh,100vh)] flex-col bg-background px-4 py-10 sm:py-14">
      <div className="relative mx-auto my-auto w-full max-w-[380px]">
        <div className="rounded-[14px] border border-border bg-card p-7 shadow-sm">
          <div className="space-y-2">
            <Skeleton className="h-8 w-44" aria-hidden />
            <Skeleton className="h-4 w-full" aria-hidden />
          </div>
          <div className="mb-5 mt-5 grid grid-cols-2 gap-2" aria-hidden>
            <Skeleton className="h-9 rounded-md" />
            <Skeleton className="h-9 rounded-md" />
          </div>
          <div className="space-y-3" aria-hidden>
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-4 w-2/3" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
};
