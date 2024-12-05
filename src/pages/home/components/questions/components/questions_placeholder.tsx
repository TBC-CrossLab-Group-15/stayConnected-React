import { Skeleton } from "@/components/ui/skeleton";

const QuestionsPlaceholder = () => {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-5 h-full mt-8 mb-8 font-sans">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="rounded-xl flex flex-col justify-center p-0 border-solid border-b border-zinc-200 bg-card text-card-foreground shadow sm:min-h-[200px] md:min-h-[200px] lg:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[150px] mb-5"
          >
            <div className="flex flex-col p-4 space-y-3">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
            <div className="flex flex-col px-4 py-2 space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>
            <div className="flex flex-wrap gap-3 px-4 py-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuestionsPlaceholder;
