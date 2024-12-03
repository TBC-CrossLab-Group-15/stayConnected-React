export type RegisterResponseType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};
export type LoginResponseType = {
  access: string;
  refresh: string;
};
