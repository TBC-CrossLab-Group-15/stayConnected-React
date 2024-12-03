import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Person from "../person";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "@/api/question";
import { useTranslation } from "react-i18next";
import { Answer } from "./types";

const QuestionContainer: React.FC = () => {
  const [approvedPerson, setApprovedPerson] = useState<number | null>(null);
  const { t } = useTranslation();

  //როცა გადავალთ კონკრეტულ კითხვაზე აიდი იქნება დასაჭერი რომ კითხვის რექუესთს გადავცეთ

  const { data } = useQuery({
    queryKey: ["question", 1],
    queryFn: () => getQuestion(1),
  });

  // const [persons, setPersons] = useState([
  //   { id: 1, name: "giorgi" },
  //   { id: 2, name: "nika" },
  //   { id: 3, name: "teona" },
  //   { id: 4, name: "tatia" },
  // ]);

  const questionAuthorIsSignedIn = true; // როცა ავტორიზირებულია კითხვის ავტორი
  const userIsSignedIn = true; // როცა ავტორიზირებულია მომხმარებელი შეუძლია პასუხის გაცემა

  const onApprove = (id: number) => {
    if (approvedPerson === id) {
      setApprovedPerson(null);
      return;
    }

    setApprovedPerson(id);
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="bg-gray-50 max-w-[1400px]  mx-auto overflow-hidden dark:bg-black p-6 md:p-8 lg:p-10 border  dark:border-gray-700 rounded-lg shadow-md flex flex-col gap-14">
      {/* Question Header */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {data?.title || "DataTitle"}
          </h2>
          <div className="flex gap-4">
            <Button className="text-gray-600 dark:text-gray-300" variant="link">
              {data?.user.first_name + " " + data?.user.last_name || "Author"}
            </Button>
            <Button className="text-gray-600 dark:text-gray-300" variant="link">
              {data?.create_date.slice(0, 10) || "date / time"}
            </Button>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {data?.text || "კითხვის აღწერა"}
        </p>
      </div>

      {/* Question Body */}
      <div className="flex flex-col gap-6 ">
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
          {t("answers")}
        </h3>
        <div className="max-h-[300px]  overflow-y-auto flex flex-col gap-4 pr-10 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent dark:scrollbar-thumb-blue-700 dark:scrollbar-track-transparent">
          {data.answers.map((person: Answer) => (
            <Person
              key={person.id}
              id={person.id}
              onApprove={onApprove}
              questionAuthorIsSignedIn={questionAuthorIsSignedIn}
              isApproved={person.isCorrect}
            />
          ))}
        </div>
      </div>

      {/* Question Footer */}
      {userIsSignedIn && (
        <div className="flex items-center gap-4 ">
          <Textarea className="flex-1" placeholder="Type your message here." />
          <Button
            className="h-full bg-blue-700 text-white dark:bg-black dark:text-white"
            variant="outline"
          >
            {t("send")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionContainer;
