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
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import QuestionsPlaceholder from "./components/questions_placeholder";
import { useTranslation } from "react-i18next";

interface MyCardProps {
  width: string;
  filteredQuestions: Questions[] | null;
}

export interface Questions {
  id: number;
  title: string;
  text: string;
  create_date: string;
  user: {
    id: number;
    avatar: string | null;
    first_name: string;
    last_name: string;
  };
  tags: { id: number; name: string }[];
  answers: { isCorrect: boolean }[];
}

const Questions: React.FC<MyCardProps> = ({ width, filteredQuestions }) => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: questionsData = { count: 0, next: null, previous: null, results: [] },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["questionslist", currentPage],
    queryFn: () =>
      getQuestions({
        page: currentPage,
        page_size: pageSize,
      }),
    enabled: !filteredQuestions,
  });

  const displayedQuestions = filteredQuestions || questionsData.results;

  const totalPages = Math.ceil(questionsData?.count / pageSize);

  if (isLoading) {
    return <QuestionsPlaceholder />;
  }

  if (isError) {
    return (
      <div>
        {t("errorLoadingQuestions")} {error?.message || "Unknown error"}
      </div>
    );
  }
  const isMobile = window.innerWidth <= 768;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: isMobile ? "auto" : "smooth",
    });
  };

  const formatDate = (isoDate: string) => {
    return format(new Date(isoDate), "dd/MM/yyyy");
  };
  return (
    <div className="w-full mx-auto px-5 h-full mt-8 mb-8 font-sans">
      {displayedQuestions?.map((question) => (
        <Card
          key={question.id}
          className={`rounded-xl flex flex-col justify-center p-0 border-solid border-b border-zinc-200 bg-card text-card-foreground shadow sm:min-h-[200px] md:min-h-[200px] lg:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[150px] ${width} mb-5`}
        >
          <NavLink to={`questionPage/${question.id}`}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{question.title}</CardTitle>
                {question.answers[0]?.isCorrect ? (
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
                    />
                    <path
                      d="M7.66663 12.6289L10.4289 15.3912C10.8733 15.8356 11.0956 16.0579 11.3717 16.0579C11.6478 16.0579 11.8701 15.8356 12.3145 15.3912L18.334 9.37173"
                      stroke="#059669"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : null}
              </div>
              <CardDescription className="flex  justify-between">
                <p>
                  {`${question.user.first_name} ${question.user.last_name}`}
                </p>
                <p>
                  {t("datePosted")}: {formatDate(question.create_date)}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg"> {question.text}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 ">
              {question.tags.length > 0 ? (
                question.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="bg-[#EEF2FF]  text-[#4E53A2] dark:bg-[#EEF2FF] dark:text-[#4E53A2] rounded-xl"
                  >
                    {tag.name}
                  </Badge>
                ))
              ) : (
                <span className="text-neutral-500">{t("noTagsAvailable")}</span>
              )}
            </CardFooter>
          </NavLink>
        </Card>
      ))}
      {!filteredQuestions && (
        <Pagination>
          <PaginationContent className="  h-20 flex justify-center w-full">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={`${
                  currentPage === 1 ? "cursor-not-allowed opacity-50  " : ""
                }`}
                aria-disabled={currentPage === 1}
              >
                "Previous"
              </PaginationPrevious>
            </PaginationItem>
            <div className="overflow-x-scroll pb-2 mt-3  flex   justify-center align-middle ">
              {[...Array(totalPages).keys()].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    className={currentPage === page + 1 ? "font-bold  " : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page + 1);
                    }}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>
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
                    ? "cursor-not-allowed opacity-50 p-0"
                    : ""
                } `}
                aria-disabled={currentPage === totalPages}
              >
                "Next"
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Questions;
