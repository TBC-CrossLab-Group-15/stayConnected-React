//import { lazy } from "react";

import Search from "../components/search/search";
import Leaderboard from "../components/leaderboard/leaderboard";
import Questions from "../components/questions/questions";

//const LazyCardSection = lazy(() => import("../card-list/card/card"));

const HomeView = () => {
  return (
    <div className="max-w-[1400px]  mx-auto">
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="xl:w-3/5 sm:w-full">
          <Search />
          <Questions width={"w-full"} />
        </div>
        <div className="xl:w-2/5 sm:w-full">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
