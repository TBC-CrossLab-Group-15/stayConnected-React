import { setAuthorizationHeader } from "@/api";
// import { userIdAtom } from "@/atoms/userIdAtom";

// import { useSetAtom } from "jotai";

export const AfterLoginSuccessn = ({
  accessToken,
  refreshToken,
  // userId,
}: {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  // userId: number | null | undefined;
}) => {
  localStorage.setItem("accessToken", accessToken || "");
  localStorage.setItem("refreshToken", refreshToken || "");
  setAuthorizationHeader(`Bearer ${accessToken}`);
  // const setUserId = useSetAtom(userIdAtom);
  // setUserId(userId); // Store the user ID globally
};
