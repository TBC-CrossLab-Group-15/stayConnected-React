//import { lazy } from "react";

import Search from "../components/search/search";
import Leaderboard from "../components/leaderboard/leaderboard";
import Questions from "../components/questions/questions";

//const LazyCardSection = lazy(() => import("../card-list/card/card"));

const HomeView = () => {
  return (
    <div className="xl:w-[1400px] flex flex-col-reverse lg:flex-row gap-10">
      <div className="xl:w-3/5 sm:w-full">
        <Search />
        <Questions width={"w-full"} />
      </div>
      <div className="  sm:w-full xl:w-2/5">
        <Leaderboard />
      </div>
    </div>
  );
};

export default HomeView;
