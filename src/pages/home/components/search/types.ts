type Tag = {
    id: number;
    name: string;
  };
  
  type User = {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
  };
  
  type Answer = {
    id: number;
    text: string;
    isCorrect: boolean;
    user: User;
    question: number;
    create_date: string;
  };
  
  type Question = {
    id: number;
    title: string;
    text: string;
    tags: Tag[];
    user: User;
    create_date: string;
    answers: Answer[];
  };
  
 export type Questions = Question[];