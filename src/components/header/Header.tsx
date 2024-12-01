import { NavLink } from "react-router-dom";
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
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <div className=" shadow-[0px_-2px_4px_rgba(0,0,0,0.1)] border-solid border-b border-b-gray-300 dark:border-b-solid dark:border-b-neutral-800">
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
        <div className="flex justify-between gap-5 md:min-w-[550px] font-sans">
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
        <div className="flex justify-between gap-3">
          {/* {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={profileData?.avatar_url ?? undefined} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-sans">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <NavLink to="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </NavLink>
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : ( */}
          <NavLink to="login" className="hidden md:block">
            <Button className="bg-blue-500 hover:bg-blue-400 text-base font-sans">
              Sign In
            </Button>
          </NavLink>
          {/* <NavLink to="addcomment">
            <Button className="rounded-full text-base font-sans h-9 w-9 bg-slate-50 text-black hover:bg-slate-100 dark:bg-black dark:text-white border dark:hover:bg-zinc-900">
              +
            </Button>
          </NavLink> only appears if user is logged in  */}
          {/* )} */}

          <ModeToggle />
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
                <DropdownMenuItem>Sign In</DropdownMenuItem>
              </NavLink>
              {/* <DropdownMenuItem>Add Question</DropdownMenuItem> only appears if user is logged in */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
