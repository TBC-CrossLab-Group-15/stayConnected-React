export type QuestionType = {
  id: number;
  tags: { id: number; name: string }[];
  answers: {
    id: number;
    text: string;
    isCorrect: boolean;
    user: {
      id: number;
      avatar: string | null;
      first_name: string;
      last_name: string;
    };
    create_date: string;
  }[];
  user: {
    id: number;
    avatar: string | null;
    first_name: string;
    last_name: string;
  };
  title: string;
  text: string;
  create_date: string;
};
