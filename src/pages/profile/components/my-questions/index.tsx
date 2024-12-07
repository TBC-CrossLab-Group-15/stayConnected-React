import { getCurrentUserQuestions } from "@/api/profile";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import Answers from "../answers";
import { deleteAnswer, deleteQuestion, getCorrectAnswer } from "@/api/question";
import { FiTrash2 } from "react-icons/fi";
import { Question } from "./types";

const MyQuestions: React.FC = () => {
  const { t } = useTranslation();
  const userId = Number(localStorage.getItem("userId"));
  console.log(typeof userId);

  const { data, refetch } = useQuery({
    queryKey: ["my-questions"],
    queryFn: getCurrentUserQuestions,
  });

  const { mutate: approve } = useMutation({
    mutationKey: ["answer"],
    mutationFn: getCorrectAnswer,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Failed to approve the answer:", error);
    },
  });

  const { mutate: remove } = useMutation({
    mutationKey: ["remove"],
    mutationFn: deleteAnswer,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Failed to approve the answer:", error);
    },
  });

  const { mutate: removeQuestion } = useMutation({
    mutationKey: ["remove"],
    mutationFn: deleteQuestion,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Failed to approve the answer:", error);
    },
  });

  const onApprove = (id: number, isCorrect: boolean) => {
    if (id === undefined) return;
    approve({ id: id, payload: isCorrect });
  };

  const onRemove = (id: number) => {
    remove(id);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[450px]">
        <img src="/images/svg123.jpg" className="w-72 h-72" alt="" />
      </div>
    );
  }
  return (
    <div className="flex flex-col  gap-5 h-[450px]  pr-1 ">
      {data?.map((question: Question) => (
        <div
          key={question.id}
          className="bg-gray-50     dark:bg-black p-3 sm:p-6 md:p-8 lg:p-10 border  dark:border-gray-700 rounded-lg shadow-md flex flex-col gap-3 sm:gap-14"
        >
          <div className="flex flex-col gap-4  ">
            <div className="flex justify-between   items-start flex-col sm:flex-row  ">
              <h2 className="text-lg underline font-semibold text-gray-800 dark:text-gray-100 ">
                {question?.title || "DataTitle"}
              </h2>
              <div className="flex gap-4">
                <Button
                  className="text-gray-600 dark:text-gray-300  p-0 sm:p-4"
                  variant="link"
                >
                  {question?.user.first_name + " " + question?.user.last_name ||
                    "Author"}
                </Button>
                <Button
                  className="text-gray-600 dark:text-gray-300 p-0 sm:p-4"
                  variant="link"
                >
                  {question?.create_date.slice(0, 10) || "date / time"}
                </Button>
              </div>
            </div>
            <p className="text-gray-700  dark:text-gray-300   text-sm leading-relaxed ">
              {question?.text || "კითხვის აღწერა"}
            </p>
          </div>

          <div className="flex flex-col gap-3 ">
            <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
              {t("answers")}
            </h3>
            <Answers
              userId={userId}
              onApprove={onApprove}
              onRemove={onRemove}
              answerData={question?.answers}
            />
          </div>
          <Button
            onClick={() => removeQuestion(question.id)}
            className="w-40 px-6 py-3  font-semibold rounded-lg  shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ease-in-out transform hover:scale-105"
            variant={"outline"}
          >
            <FiTrash2 className="mr-2 text-lg" />
            {t("deleteQuestion")}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MyQuestions;
