import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MdDelete
} from "react-icons/md";

type AnswerType = {
  id: number;
  text: string;
  isCorrect: boolean;
  create_date: string|undefined;
  question: number;
  user: {
    avatar: string | null;
    first_name: string;
    id: number;
    last_name: string;
  }
};

type AnswerPropsTypes = {
  answerData:{
    create_date: string|undefined;
    id: number;
    isCorrect: boolean;
    question: number;
    text: string;
    user: {
      avatar: string | null;
      first_name: string;
      id: number;
      last_name: string;
    }
  }[]|[];
  onApprove: (id: number, isCorrect: boolean) => void;
  onRemove: (id: number) => void;
  userId: number | null;
};

const Answers: React.FC<AnswerPropsTypes> = ({ answerData, onApprove ,onRemove,userId}) => {
  const { t } = useTranslation();

console.log(answerData)

  if (!answerData || answerData.length === 0) {
    return <p>No answers yet</p>;
  }

  return (
    <>
      {answerData?.map((answer: AnswerType) => (
        <div
          key={answer.id}
          className="dark:bg-gray-800   p-5 persons flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between shadow-inner  border rounded-lg"
        >
          {/* Left section */}
          <div className="flex w-full h-full  rounded-lg  dark:bg-gray-500  flex-col sm:flex-row gap-5 overflow-hidden">
            <div className="flex-1 p-2 bg-white text-center sm:text-start  dark:bg-black dark:text-white overflow-y-auto  rounded-lg  sm:h-auto">
              {answer.text}
            </div>
          </div>

          {/* Right section */}
          <div className="flex  justify-around sm:justify-start  items-start gap-2 flex-row sm:flex-col sm:items-center sm:gap-5">
            <div className="flex gap-2 ">
              <Button
                onClick={() => onApprove(answer.id, !answer.isCorrect)}
                variant="outline"
                className={` w-20  ${
                  answer?.isCorrect
                    ? "bg-red-500 text-white hover:bg-red-600 border-red-500 dark:bg-red-500 dark:text-white "
                    : "bg-blue-500 text-white hover:bg-blue-600 border-blue-500 "
                }`}
              >
                {answer.isCorrect ? t("reject") : t("approve")}
              </Button>
            </div>

            <Button className="p-0  flex flex-col" variant="link">
              <p>{answer?.create_date?.slice(0, 10)}</p>
              <p>{answer?.create_date?.slice(11, 19)}</p>
            </Button>

            {answer.isCorrect && (
              <Button
                className="h-full  flex justify-center items-end text-green-500"
                variant="link"
              >
                Accepted
              </Button>
            )}
            {!answer.isCorrect && (
              <Button
                className="h-full flex justify-center items-end  w-20"
                variant="link"
              ></Button>
            )} 
          {userId == answer.user.id &&
                  <Button onClick={() => onRemove(answer.id)} className="bg-gray-400 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 active:bg-red-700">
                  <MdDelete size={20} />
                </Button>
          }         

          </div>


        </div>
      ))}
    </>
  );
};

export default Answers;