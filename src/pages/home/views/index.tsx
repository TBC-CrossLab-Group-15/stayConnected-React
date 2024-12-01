//import { lazy } from "react";

import Search from "../components/search/search";
import Leaderboard from "../components/leaderboard/leaderboard";
import Questions from "../components/questions/questions";

//const LazyCardSection = lazy(() => import("../card-list/card/card"));

const HomeView = () => {
  return (
    <div className="max-w-[1400px]  mx-auto">
      <div className="flex gap-10">
        <div className="w-3/5">
          <Search />
          <Questions width={"w-full"} />
        </div>
        <div className="w-2/5">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
