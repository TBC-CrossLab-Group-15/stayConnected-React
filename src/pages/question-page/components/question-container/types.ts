export type Answer = {
    id: number;
    text: string;
    isCorrect: boolean;
    user: {
      id: number;
      avatar: {
        id: number;
        name: string;
      };
      first_name: string;
      last_name: string;
    };
    question: number;
    create_date: string;
  };
  