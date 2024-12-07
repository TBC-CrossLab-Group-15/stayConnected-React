import { getTags } from "@/api/tags";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const Search = () => {
  const {
    data: tagsData = [],
    isError,
    error,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
  const { t } = useTranslation();
  console.log("tags:", tagsData);
  if (isError) {
    return (
      <div>
        {t("errorLoadingTags")} {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-5  mt-8 mb-8 font-sans flex gap-5 ">
      <Command className="rounded-lg border shadow-md md:min-w-[300px] w-3/4 dark:border-solid dark:border-neutral-800">
        <CommandInput placeholder={t("typeCommandOrTag")} />
      </Command>
      <Select>
        <SelectTrigger className=" md:min-w-[150px] w-1/4 h-10 rounded-lg border shadow-md ">
          <SelectValue placeholder={t("chooseTag")} />
        </SelectTrigger>
        <SelectContent className="text-sans">
          {tagsData.map((tag) => (
            <SelectItem key={tag.id} value={tag.name}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button className="bg-blue-500">{t("search")}</Button>
    </div>
  );
};

export default Search;
