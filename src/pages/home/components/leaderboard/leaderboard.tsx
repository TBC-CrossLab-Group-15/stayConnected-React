import { getLeaderBoard } from "@/api/leaderboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useQuery } from "@tanstack/react-query";
import LeaderboardPlaceholder from "./components/leaderboard_placeholder";
import { useTranslation } from "react-i18next";

const Leaderboard: React.FC = () => {
  const {
    data: leaderBoardData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderBoard({ order: "desc" }),
  });
  const { t } = useTranslation();
  if (isLoading) {
    return <LeaderboardPlaceholder />;
  }
  if (isError) {
    return (
      <div>Error loading leaderboard: {error?.message || "Unknown error"}</div>
    );
  }

  const topThree = leaderBoardData.slice(0, 3);
  const others = leaderBoardData.slice(3, 10);

  return (
    <div className="w-full p-5 flex-col sticky top-[90px] bg-gray-100 rounded-lg border shadow-lg dark:bg-black dark:border-solid dark:border-neutral-800">
      {/* Top 3 Users */}
      <h1 className="mb-3 text-xl font-sans font-bold text-center">
        {t("leaderboard")}
      </h1>
      <div className="flex justify-between mb-6 gap-4 xsm:flex-col sm:flex-row lg:flex-col xl:flex-row">
        {topThree.map((user, index) => {
          const colors = ["bg-yellow-300", "bg-gray-300", "bg-orange-400"];

          const avatar = createAvatar(avataaars, {
            seed: `${user?.avatar || user.first_name}`,
          });
          const svg = avatar.toString();
          const encodedSvg = encodeURIComponent(svg).replace(/%20/g, " ");
          const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

          return (
            <div
              key={index}
              className={`flex flex-col items-center p-4 rounded-lg shadow ${colors[index]} xsm:w-full w-1/3 lg:w-full xl:w-1/3`}
            >
              <Avatar className="mb-3">
                <AvatarImage
                  src={dataUrl}
                  className="w-full h-full"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-center flex flex-col justify-between  h-14">
                <h2 className="text-md font-semibold dark:text-black">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-sm dark:text-black">
                  {t("score")}: {user.rating}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Remaining Users */}
      <div className="bg-white rounded-lg border shadow p-4 dark:bg-neutral-950 dark:border-solid dark:border-neutral-800">
        {others.map((user, index) => {
          const avatar = createAvatar(avataaars, {
            seed: `${user?.avatar || user.first_name}`,
          });
          const svg = avatar.toString();
          const encodedSvg = encodeURIComponent(svg).replace(/%20/g, " ");
          const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

          return (
            <div
              key={index}
              className="flex items-center p-2 border-b last:border-none hover:bg-gray-50 dark:hover:bg-neutral-900 rounded-md"
            >
              <span className="w-6 font-bold text-gray-600 mr-3">
                {index + 4}.
              </span>
              <Avatar className="mr-3">
                <AvatarImage
                  src={dataUrl}
                  className="w-full h-full"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="w-full flex justify-between">
                <h3 className="text-sm font-medium">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-xs text-gray-500">
                  {t("score")}: {user.rating}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
