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
  const { t } = useTranslation();
  console.log(t("next"));
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
  });

  const totalPages = Math.ceil(questionsData?.count / pageSize);

  console.log("questions:", questionsData);

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

  console.log(questionsData.results);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (isoDate: string) => {
    return format(new Date(isoDate), "dd/MM/yyyy");
  };
  return (
    <div className="max-w-[1400px] w-full mx-auto px-5 h-full mt-8 mb-8 font-sans">
      {questionsData?.results?.map((question) => (
        <Card
          key={question.id}
          className={`rounded-xl flex flex-col justify-center p-0 border-solid border-b border-zinc-200 bg-card text-card-foreground shadow sm:min-h-[200px] md:min-h-[200px] lg:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[150px] ${width} mb-5`}
        >
          <NavLink to={`questionPage/${question.id}`}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{question.title}</CardTitle>
              </div>
              <CardDescription className="flex justify-between">
                <p>
                  {question.user.first_name} {question.user.first_name}
                </p>
                <p>
                  {t("datePosted")}: {formatDate(question.create_date)}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg"> {question.text}</p>
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
                <span>{t("noTagsAvailable")}</span>
              )}
            </CardFooter>
          </NavLink>
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
              {t("previous")}
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
              {t("next")}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Questions;
