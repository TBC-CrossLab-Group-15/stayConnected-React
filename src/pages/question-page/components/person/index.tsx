import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React, { PropsWithChildren } from "react";

const Person: React.FC<PropsWithChildren> = () => {
  return (
    <div className="dark:bg-gray-800 persons flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between  shadow-inner bg-gray-200 border rounded-lg p-5 ">
      {/* Left Section */}
      <div className="flex gap-5 ">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex  items-start gap-2 sm:flex-row sm:items-center sm:gap-5 ">
        <Button className="p-0" variant="link">
          Date Time
        </Button>
        <Button variant="outline" className=" w-full">
          Approve
        </Button>
      </div>
    </div>
  );
};

export default Person;
