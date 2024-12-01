import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Person: React.FC<{
  questionAuthorIsSignedIn: boolean;
  onApprove: (id: number) => void;
  id: number;
  isApproved: boolean;
}> = ({ questionAuthorIsSignedIn, onApprove, id, isApproved }) => {
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

      {
        questionAuthorIsSignedIn && (
          <Button
          onClick={() => onApprove(id)}
          variant="outline"
          className={`w-full ${
            isApproved
              ? "bg-green-500 text-white hover:bg-green-600 border-green-500"
              : "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
          }`}
        >
          {isApproved ? "Unapprove" : "Approve"}
        </Button>
        )
      }

      </div>
    </div>
  );
};

export default Person;
