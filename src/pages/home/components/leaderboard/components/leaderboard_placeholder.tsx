import { Skeleton } from "@/components/ui/skeleton";

const LeaderboardPlaceholder = () => {
  return (
    <div className="w-full p-5 flex-col sticky top-[90px] bg-gray-100 rounded-lg border shadow-lg dark:bg-black dark:border-solid dark:border-neutral-800">
      <Skeleton className="h-8 w-1/3 mb-5 mx-auto rounded" />
      <div className="flex justify-between mb-6 gap-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-lg shadow w-1/3"
            >
              <Skeleton className="w-16 h-16 mb-3 rounded-full" />
              <div className="text-center flex flex-col justify-between h-14">
                <Skeleton className="h-4 w-2/3 mx-auto mb-2 rounded" />
                <Skeleton className="h-3 w-1/2 mx-auto rounded" />
              </div>
            </div>
          ))}
      </div>
      <div className="bg-white rounded-lg border shadow p-4 dark:bg-neutral-950 dark:border-solid dark:border-neutral-800">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center p-2 border-b last:border-none hover:bg-gray-50"
            >
              <Skeleton className="w-6 h-6 font-bold text-gray-600 mr-3 rounded" />
              <Skeleton className="w-10 h-10 mr-3 rounded-full" />
              <div className="w-full flex justify-between">
                <Skeleton className="h-4 w-1/3 rounded" />
                <Skeleton className="h-3 w-1/4 rounded" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeaderboardPlaceholder;
