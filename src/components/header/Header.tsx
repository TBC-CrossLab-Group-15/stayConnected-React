import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
// import { Command, CommandInput } from "@/components/ui/command";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
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

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useAuthContext();
  const userId = localStorage.getItem("userId");
  const handleLogout = () => {
    UseLogoutClick();
    navigate("/login");
  };

  return (
    <div className="z-50 dark:bg-black sticky top-0 left-0 w-full  bg-white shadow-[0px_-2px_4px_rgba(0,0,0,0.1)] border-solid border-b border-b-gray-300 dark:border-b-solid dark:border-b-neutral-800">
      <div className="max-w-[1400px]  mx-auto  px-5 h-20 flex items-center justify-between gap-4">
        <div className="text-2xl font-bold">
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
        <div className="flex justify-between gap-5 md:min-w-[550px] font-sans ">
          {/* <Command className="rounded-lg border shadow-md md:min-w-[300px] ">
            <CommandInput placeholder="Type a command or choose a tag..." />
          </Command>
          <Select>
            <SelectTrigger className=" md:min-w-[150px] h-10 rounded-lg border shadow-md ">
              <SelectValue placeholder="Choose a tag" />
            </SelectTrigger>
            <SelectContent className="text-sans">
              <SelectItem value="light">C#</SelectItem>
              <SelectItem value="dark">React</SelectItem>
              <SelectItem value="system">C++</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
        <div className="flex justify-between items-center gap-3 p-4 rounded-lg">
          {userId ? (
            <>
              <NavLink to="createQuestion ">
                <Button className="rounded-full  text-base font-sans h-9 w-9  bg-slate-50 text-black hover:bg-slate-100 dark:bg-black dark:text-white border dark:hover:bg-zinc-900">
                  +
                </Button>
              </NavLink>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="p-5">
                    <AvatarImage src={user?.user?.avatar ?? undefined} />
                    <AvatarFallback>{user?.user?.first_name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="shadow-md rounded-md p-2 gap-2 flex justify-center items-center flex-col ">
                  <DropdownMenuItem className="p-0">
                    <NavLink to="/profile">
                      <Button variant="ghost" className="w-full  px-6">
                        Profile
                      </Button>
                    </NavLink>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="p-0"
                    onClick={() => handleLogout()}
                  >
                    <Button variant="ghost" className="w-full  ">
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="bg-black">
              <NavLink to="login" className="hidden md:block">
                <Button className="bg-blue-500 hover:bg-blue-400 text-base font-sans">
                  {t("sign-in")}
                </Button>
              </NavLink>
            </div>
          )}
          <LanguageSwitcher />

          {/* <NavLink to="addcomment">
            <Button className="rounded-full text-base font-sans h-9 w-9 bg-slate-50 text-black hover:bg-slate-100 dark:bg-black dark:text-white border dark:hover:bg-zinc-900">
              +
            </Button>
          </NavLink> only appears if user is logged in  */}
          {/* )} */}

          <ModeToggle />
          {!userId ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="block md:hidden">
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
