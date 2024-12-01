import { Command, CommandInput } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Search = () => {
  return (
    <>
      <div className="max-w-[1200px] mx-auto px-5  mt-8 mb-8 font-sans flex gap-5 ">
        <Command className="rounded-lg border shadow-md md:min-w-[300px] w-3/4 dark:border-solid dark:border-neutral-800">
          <CommandInput placeholder="Type a command or choose a tag..." />
        </Command>
        <Select>
          <SelectTrigger className=" md:min-w-[150px] w-1/4 h-10 rounded-lg border shadow-md ">
            <SelectValue placeholder="Choose a tag" />
          </SelectTrigger>
          <SelectContent className="text-sans">
            <SelectItem value="light">C#</SelectItem>
            <SelectItem value="dark">React</SelectItem>
            <SelectItem value="system">C++</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Search;
