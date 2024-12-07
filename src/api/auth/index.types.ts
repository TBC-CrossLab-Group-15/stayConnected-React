export type RegisterResponseType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};
export type LoginResponseType = {
  access: string | undefined;
  refresh: string | undefined;
  user_id: number | null;
};

export type RefreshPayload = {
  payload: {
    refresh: string | null;
  };
};
// export type LogoutPayload = {
//   payload: {
//     logout: string;
//   };
// };
