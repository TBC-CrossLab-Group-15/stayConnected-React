import { Button } from "@/components/ui/button";
import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useTranslation } from "react-i18next";

const Person: React.FC<{
  questionAuthorIsSignedIn: boolean;
  onApprove: (id: number, isCorrect: boolean) => void;
  id: number;
  isApproved: boolean;
  userAvatar: string;
  userName: string;
  text: string;
}> = ({
  questionAuthorIsSignedIn,
  onApprove,
  id,
  isApproved,
  userAvatar,
  userName,
  text,
}) => {
  const { t } = useTranslation();

  const avatar = createAvatar(avataaars, {
    seed: userAvatar,
  });
  const svg = avatar.toString();
  const encodedSvg = encodeURIComponent(svg).replace(/%20/g, " ");
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

  return (
    <div className="dark:bg-gray-800 h-full  persons flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between  shadow-inner bg-gray-200 border rounded-lg p-5 ">
      {/* Left Section */}

      <div className="flex w-full h-full  sm:h-64  flex-col sm:flex-row gap-5 bg-white  overflow-hidden p-4">
        {/* Icon Box */}
        <div className="flex flex-col justify-center  items-center w-full sm:w-1/4 p-4 bg-gray-100 rounded-lg">
          <Avatar className="w-16 h-16 sm:h-28 sm:w-28">
            <AvatarImage
              src={dataUrl}
              className="w-full h-full "
              alt="@shadcn"
            />
            <AvatarFallback className="text-lg">{userName}</AvatarFallback>
          </Avatar>
          <div className="mt-2 text-sm text-gray-600  rounded-lg p-2 font-bold">
            {userName}
          </div>
        </div>

        {/* Text Box */}
        <div className="flex-1  overflow-y-auto bg-gray-50 p-4 rounded-lg h-48 sm:h-auto">
          <p className="text-sm h-48  sm:text-base overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent dark:scrollbar-thumb-blue-700 dark:scrollbar-track-transparent pr-1">
            {text}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-around sm:justify-start  sm:h-64  items-start gap-2 flex-row  sm:flex-col sm:items-center sm:gap-5 ">
        <Button className="p-0" variant="link">
          {t("date")} {t("time")}
        </Button>

        {questionAuthorIsSignedIn && (
          <Button
            onClick={() => onApprove(id, !isApproved)}
            variant="outline"
            className={`w-50  ${
              isApproved
                ? "bg-red-500 text-white hover:bg-red-600 border-red-500"
                : "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
            }`}
          >
            {isApproved ? t("reject") : t("approve")}
          </Button>
        )}
        {isApproved && (
          <Button
            className="h-full flex justify-center items-end text-green-500"
            variant="link"
          >
            Accepted
          </Button>
        )}
      </div>
    </div>
  );
};

export default Person;
