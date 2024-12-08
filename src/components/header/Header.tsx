import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "./components/language";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/context/auth/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import UseLogoutClick from "../../hooks/onLogoutClick";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { useAtomValue } from "jotai";
import { userIconAtom } from "@/store/authIcon";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const userId = localStorage.getItem("userId");
  const handleLogout = () => {
    UseLogoutClick();
    navigate("/login");
  };
  const icon = useAtomValue(userIconAtom);

  const avatar = createAvatar(avataaars, {
    seed:
      icon ??
      (user && user.first_name ? `${user.avatar ?? user.first_name}` : ""),
  });
  const svg = avatar.toString();
  const encodedSvg = encodeURIComponent(svg).replace(/%20/g, " ");
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

  return (
    <div className="z-50 dark:bg-black  overflow-hidden  sticky top-0 left-0 w-full   bg-white shadow-[0px_-2px_4px_rgba(0,0,0,0.1)] border-solid border-b border-b-gray-300 dark:border-b-solid dark:border-b-neutral-800">
      <div className=" w-full sm:w-[90%]  mx-auto p-0  sm:px-5  h-20 flex items-center justify-between gap-4 ">
        <div className="text-2xl font-bold pl-5 ">
          <NavLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-code"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </NavLink>
        </div>
        <div className="flex justify-between gap-5 md:w-[550px] font-sans "></div>
        <div className="flex justify-between items-center gap-3 p-4 rounded-lg">
          {userId ? (
            <>
              <NavLink to="createQuestion  ">
                <Button
                  variant={"outline"}
                  className="flex hover:scale-105 transition-all duration-300"
                >
                  {t("add-question")}
                </Button>
              </NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger className=" justify-center items-center flex border border-neutral-200  rounded-full  hover:scale-105 transition-all duration-300 cursor-pointer">
                  <Avatar className="relative flex justify-center items-center  w-12 h-12 rounded-full  overflow-hidden ">
                    <AvatarImage
                      className="object-cover w-full h-full "
                      src={dataUrl}
                    />
                    <AvatarFallback className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                      {user?.first_name}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="shadow-md border  border-neutral-200 mt-4 rounded-md  p-2 gap-2 flex justify-center items-center flex-col ">
                  <DropdownMenuItem className="p-0">
                    <NavLink to="/profile">
                      <Button variant="ghost" className="w-full  px-6">
                        {t("profile")}
                      </Button>
                    </NavLink>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="p-0"
                    onClick={() => handleLogout()}
                  >
                    <Button variant="ghost" className="w-full ">
                      {t("logout")}
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div>
              <NavLink to="login" className="hidden md:block ">
                <Button variant="primary" className="text-base font-sans">
                  {t("sign-in")}
                </Button>
              </NavLink>
            </div>
          )}
          <LanguageSwitcher />
          <ModeToggle />
          {!userId ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="block md:hidden ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-align-justify"
                >
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                  <path d="M3 6h18" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <NavLink to="login">
                  <DropdownMenuItem>{t("sign-in")}</DropdownMenuItem>
                </NavLink>
                {/* <DropdownMenuItem>Add Question</DropdownMenuItem> only appears if user is logged in */}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
