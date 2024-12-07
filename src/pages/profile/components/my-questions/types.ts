export type User = {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type Answer = {
  id: number;
  text: string;
  isCorrect: boolean;
  user: User;
  question: number;
  create_date: string;
};

export type Question = {
  id: number;
  title: string;
  text: string;
  tags: Tag[];
  user: User;
  create_date: string;
  answers: Answer[];
};
