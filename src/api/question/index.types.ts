export type questionResponseType = {
  id: number;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
  answers: [
    {
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
    },
    {
      id: number;
      text: string;
      isCorrect: false;
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
    },
  ];
  user: {
    id: number;
    avatar: {
      id: number;
      name: string;
    };
    first_name: string;
    last_name: string;
  };
  title: string;
  text: string;
  create_date: string;
};
