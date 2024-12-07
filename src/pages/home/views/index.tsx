//import { lazy } from "react";

import Search from "../components/search/search";
import Leaderboard from "../components/leaderboard/leaderboard";
import Questions from "../components/questions/questions";
import { useState } from "react";

//const LazyCardSection = lazy(() => import("../card-list/card/card"));
interface Tag {
  id: number;
  name: string;
}

interface User {
  id: number;
  avatar: string | null;
  first_name: string;
  last_name: string;
}

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
  user: User;
  question: number;
  create_date: string;
}

interface Question {
  id: number;
  title: string;
  text: string;
  tags: Tag[];
  user: User;
  create_date: string;
  answers: Answer[];
}

const HomeView = () => {
  const [filteredQuestions, setFilteredQuestions] = useState<Question[] | null>(
    null,
  );
  const handleFilteredQuestions = (data: Question[]) => {
    setFilteredQuestions(data);
    console.log("viewidan data", data);
  };
  return (
    <div className="xl:w-[1400px] flex flex-col-reverse lg:flex-row gap-10">
      <div className="xl:w-3/5 sm:w-full">
        <Search onFilter={handleFilteredQuestions} />
        <Questions width={"w-full"} filteredQuestions={filteredQuestions} />
      </div>
      <div className="  sm:w-full xl:w-2/5">
        <Leaderboard />
      </div>
    </div>
  );
};

export default HomeView;
