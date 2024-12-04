import { getQuestions } from "@/api/question";
import { questionResponseType } from "@/api/question/index.types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface myCardProps {
  width: string;
}

interface Questions {
  id: number;
  title: string;
  description: string;
  is_answered: boolean;
  date: string;
  user: {
    user_name: string;
    user_surname: string;
  };
  tags: { id: number; name: string }[];
}

const Questions: React.FC<myCardProps> = ({ width }) => {
  const [questionsData, setQuestionsData] = useState<Questions[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data: questionResponseType[] = await getQuestions();
        console.log(data);
        if (data) {
          const transformedData: Questions[] = data.map((questions) => {
            return {
              id: questions.id,
              title: questions.title,
              description: questions.text,
              is_answered: questions.answers[0]?.isCorrect ?? false, // Safe access
              date: questions.create_date,
              user: {
                user_name: questions.user.first_name,
                user_surname: questions.user.last_name,
              },
              tags:
                questions.tags?.map((tag) => ({
                  id: tag.id,
                  name: tag.name,
                })) || [], // Ensure tags are an array
            };
          });
          setQuestionsData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="max-w-[1400px] w-full mx-auto px-5 h-full mt-8 mb-8 font-sans">
      {questionsData.map((question) => (
        <Card
          key={question.id}
          className={`rounded-xl flex flex-col justify-center p-0 border-solid border-b border-zinc-200 bg-card text-card-foreground shadow sm:h-[320px] md:h-[300px] lg:h-[300px] xl:h-[280px] 2xl:h-[250px] ${width} mb-5`}
        >
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{question.title}</CardTitle>
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13Z"
                  fill="#ECFDF5"
                ></path>
                <path
                  d="M7.66663 12.6289L10.4289 15.3912C10.8733 15.8356 11.0956 16.0578 11.3717 16.0578C11.6478 16.0578 11.8701 15.8356 12.3145 15.3912L18.334 9.3717"
                  stroke="#059669"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
            <CardDescription>
              <NavLink to="/author" className="hover:underline">
                {question.user.user_name} {question.user.user_surname},
              </NavLink>{" "}
              {question.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg"> {question.description}</p>
          </CardContent>
          <CardFooter className="flex gap-3">
            {question.tags.length > 0 ? (
              question.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="bg-[#EEF2FF] text-[#4E53A2] dark:bg-[#EEF2FF] dark:text-[#4E53A2] rounded-xl"
                >
                  {tag.name}
                </Badge>
              ))
            ) : (
              <span>No tags available</span>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Questions;
