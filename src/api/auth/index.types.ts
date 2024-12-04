export type RegisterResponseType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};
export type LoginResponseType = {
  access: string | undefined;
  refresh: string | undefined;
};

export type RefreshPayload = {
  payload: {
    refresh: string;
  };
};
