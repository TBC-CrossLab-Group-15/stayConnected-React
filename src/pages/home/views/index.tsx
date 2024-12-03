//import { lazy } from "react";

import Search from "../components/search/search";
import Leaderboard from "../components/leaderboard/leaderboard";
import Questions from "../components/questions/questions";

const users = [
  {
    id: "1",
    name: "Alice",
    avatar: "https://via.placeholder.com/150",
    score: 1200,
  },
  {
    id: "2",
    name: "Bob",
    avatar: "https://via.placeholder.com/150",
    score: 1100,
  },
  {
    id: "3",
    name: "Charlie",
    avatar: "https://via.placeholder.com/150",
    score: 1050,
  },
  {
    id: "4",
    name: "Diana",
    avatar: "https://via.placeholder.com/150",
    score: 1000,
  },
  {
    id: "5",
    name: "Eve",
    avatar: "https://via.placeholder.com/150",
    score: 950,
  },
  {
    id: "6",
    name: "Frank",
    avatar: "https://via.placeholder.com/150",
    score: 900,
  },
  {
    id: "7",
    name: "Grace",
    avatar: "https://via.placeholder.com/150",
    score: 850,
  },
  {
    id: "8",
    name: "Hank",
    avatar: "https://via.placeholder.com/150",
    score: 800,
  },
  {
    id: "9",
    name: "Ivy",
    avatar: "https://via.placeholder.com/150",
    score: 750,
  },
  {
    id: "10",
    name: "Jack",
    avatar: "https://via.placeholder.com/150",
    score: 700,
  },
];

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
          <Leaderboard users={users} />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
