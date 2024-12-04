import { getQuestions } from "@/api/question";

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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const data: QuestionType[] = await getQuestions({
  //         page: currentPage,
  //         page_size: pageSize,
  //       });
  //       console.log(data);
  //       if (data) {
  //         const transformedData: Questions[] = data.map((questions) => {
  //           return {
  //             id: questions.id,
  //             title: questions.title,
  //             description: questions.text,
  //             is_answered: questions.answers[0]?.isCorrect ?? false, // Safe access
  //             date: questions.create_date,
  //             user: {
  //               user_name: questions.user.first_name,
  //               user_surname: questions.user.last_name,
  //             },
  //             tags:
  //               questions.tags?.map((tag) => ({
  //                 id: tag.id,
  //                 name: tag.name,
  //               })) || [], // Ensure tags are an array
  //           };
  //         });
  //         setQuestionsData(transformedData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching questions:", error);
  //     }
  //   };

  //   fetchQuestions();
  // }, []);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions({
          page: currentPage,
          page_size: pageSize,
        });

        setQuestionsData(
          data.results.map((question) => ({
            id: question.id,
            title: question.title,
            description: question.text,
            is_answered: question.answers.some((a) => a.isCorrect), // Check if any answer is correct
            date: question.create_date,
            user: {
              user_name: question.user.first_name,
              user_surname: question.user.last_name,
            },
            tags: question.tags || [],
          }))
        );

        // Calculate total pages
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (isoDate: string) => {
    return format(new Date(isoDate), "dd/MM/yyyy");
  };
  return (
    <div className="max-w-[1400px] w-full mx-auto px-5 h-full mt-8 mb-8 font-sans">
      {questionsData.map((question) => (
        <Card
          key={question.id}
          className={`rounded-xl flex flex-col justify-center p-0 border-solid border-b border-zinc-200 bg-card text-card-foreground shadow sm:min-h-[200px] md:min-h-[200px] lg:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[150px] ${width} mb-5`}
        >
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{question.title}</CardTitle>
            </div>
            <CardDescription className="flex justify-between">
              <p>
                {question.user.user_name} {question.user.user_surname}
              </p>
              <p>Date Posted: {formatDate(question.date)}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg"> {question.description}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-3">
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              className={`${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              aria-disabled={currentPage === 1}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>
          {[...Array(totalPages).keys()].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                className={currentPage === page + 1 ? "font-bold" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page + 1);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
              className={`${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              aria-disabled={currentPage === totalPages}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Questions;
