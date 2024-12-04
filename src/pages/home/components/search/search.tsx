import { getTags } from "@/api/tags";
import { TagsResponseType } from "@/api/tags/index.types";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface Tags {
  id: number;
  name: string;
}

const Search = () => {
  const [tagsData, setTagsData] = useState<Tags[]>([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data: TagsResponseType[] = await getTags();
        console.log(data);
        if (data) {
          const transformedData: Tags[] = data.map((tags) => {
            return {
              id: tags.id,
              name: tags.name,
            };
          });
          setTagsData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchTags();
  }, []);

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
            {tagsData.map((tag) => (
              <SelectItem key={tag.id} value={tag.name}>
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Search;
