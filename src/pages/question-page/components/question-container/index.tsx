import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Person from "../person";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCorrectAnswer, getQuestion, sendAnswer } from "@/api/question";
import { useTranslation } from "react-i18next";
import { Answer } from "./types";
import { Controller, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
const QuestionContainer: React.FC = () => {
  const { id } = useParams();
  //
  const { t } = useTranslation();
  //
  const { control, handleSubmit,reset } = useForm({ defaultValues: { answer: "" } });
  //
  const userId = localStorage.getItem("userId"); // მომავალში ლოკალსთორეჯიდან წამოვიღებ
  const questionId = Number(id); // როცა რომელიმე კითხვაზე დაკლიკებით გადმოვა კონკრეტულ შეკითხვაზე

  //
  const { data, refetch } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => getQuestion(questionId),
  });

  const { mutate: Answer } = useMutation({
    mutationKey: ["answers", questionId],
    mutationFn: sendAnswer,
    onSuccess: () => {
      refetch();
    },
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
  //
  const ifUserIsAuth = () => {
    return userId == data?.user.id;
  };
  const questionAuthorIsSignedIn = ifUserIsAuth(); // როცა ავტორიზირებულია კითხვის ავტორი / ამით გამოჩნდება aprove ღილაკი
  const userIsSignedIn = localStorage.getItem("accessToken"); // როცა ავტორიზირებულია მომხმარებელი შეუძლია პასუხის გაცემა და ამით გამოჩნდება სენდის ღილაკი
  //

  const onApprove = (id: number, isCorrect: boolean) => {
    approve({ id: id, payload: isCorrect });
  };

  const onSendAnswer = ({ answer }: { answer: string }) => {
    Answer({ questionId: questionId, answerText: answer });
    reset();
  };
  //
  if (!data) return <p>Loading...</p>;
  //

  return (
    <div className="  flex flex-col  gap-10 w-full  ">
      <div className="bg-gray-50   h-[750px] sm:h-auto w-full sm:w-[80%] mx-auto overflow-hidden dark:bg-black p-3 sm:p-6 md:p-8 lg:p-10 border  dark:border-gray-700 rounded-lg shadow-md flex flex-col gap-3 sm:gap-14">
        {/* Question Header */}
        <div className="flex flex-col gap-4  ">
          <div className="flex justify-between items-start flex-col sm:flex-row  ">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 ">
              {data?.title || "DataTitle"}
            </h2>
            <div className="flex gap-4">
              <Button
                className="text-gray-600 dark:text-gray-300  p-0 sm:p-4"
                variant="link"
              >
                {data?.user.first_name + " " + data?.user.last_name || "Author"}
              </Button>
              <Button
                className="text-gray-600 dark:text-gray-300 p-0 sm:p-4"
                variant="link"
              >
                {data?.create_date.slice(0, 10) || "date / time"}
              </Button>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300  text-sm leading-relaxed ">
            {data?.text || "კითხვის აღწერა"}
          </p>
        </div>
        {/* Question Body */}
        <div className="flex flex-col gap-6 ">
          <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
            {t("answers")}
          </h3>
          <div className="max-h-[400px] sm:max-h-[300px]  overflow-y-auto flex flex-col gap-4 pr-10 scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-transparent dark:scrollbar-thumb-sky-700 dark:scrollbar-track-transparent ">
            {data?.answers?.map((person: Answer) => (
              <Person
                text={person?.text}
                userName={
                  person?.user?.first_name + " " + person?.user?.last_name
                }
                userAvatar={person?.user?.avatar}
                key={person?.id}
                id={person?.id}
                onApprove={onApprove}
                questionAuthorIsSignedIn={questionAuthorIsSignedIn}
                isApproved={person?.isCorrect}
                date={person?.create_date}
              />
            ))}
          </div>
        </div>
        {/* Question Footer */}
        {userIsSignedIn && (
          <form
            onSubmit={handleSubmit(onSendAnswer)}
            className="flex items-center gap-4  flex-col sm:flex-row"
          >
            <Controller
              name="answer" // The name of the field in the form data
              control={control} // Pass in the control object from useForm
              defaultValue="" // Default value for the textarea
              render={({ field }) => (
                <Textarea
                  {...field} // Spread the field props (onChange, value, etc.)
                  className="flex-1"
                  placeholder={t("answerPlaceHolder")}
                />
              )}
            />
            <Button
              type="submit"
              className="w-full sm:w-20 p-0 sm:p-7  "
              variant="secondary"
            >
              {t("send")}
            </Button>
          </form>
        )}
      </div>

      {!userIsSignedIn && (
        <div className="flex w-full sm:w-[80%] mx-auto justify-center items-center space-x-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-gray-700 dark:text-gray-200 text-lg">
            <Button
              variant="link"
              className="text-blue-500  p-2 text-lg dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
            >
              <Link to="/login" className="font-semibold">
                {t("sign-in-question-page")}
              </Link>
            </Button>
            {t("singMessage")}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionContainer;
