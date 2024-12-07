import React, { useRef, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "../../../components/ui/badge";
import { X } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { CommandList, Command as CommandPrimitive } from "cmdk";
import { fetchTags } from "../../../api/createQuestion/index";
import { useTranslation } from "react-i18next";

type Framework = { id: number; name: string };

type FancyMultiSelectProps = {
  selected: Framework[];
  onChange: React.Dispatch<React.SetStateAction<Framework[]>>;
};

const CreateQuestion: React.FC<FancyMultiSelectProps> = ({
  selected,
  onChange,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const {
    data: tags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 300000,
    select: (data) => (Array.isArray(data) ? data : []),
  });

  const handleUnselect = useCallback(
    (tag: Framework) => {
      onChange((prev) => prev.filter((s) => s.id !== tag.id));
    },
    [onChange],
  );

  const selectables = Array.isArray(tags)
    ? tags.filter((tag) => !selected.some((s) => s.id === tag.id))
    : [];

  if (isLoading) return <p>{t("loadingTags", "Loading...")}</p>;
  if (isError) return <p>{t("failedToLoadTags", "Failed to load tags.")}</p>;

  return (
    <Command onKeyDown={() => {}} className="overflow-visible bg-transparent">
      <div className="group rounded-md  px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 border-primary">
        <div className="flex flex-wrap gap-1">
          {selected.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleUnselect(tag)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={t("selectTags", "Select tags...")}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 && (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in max-h-52 overflow-y-auto">
              <CommandGroup>
                {selectables.map((tag: { id: number; name: string }) => (
                  <CommandItem
                    key={tag.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      setInputValue("");
                      onChange((prev) => [...prev, tag]);
                    }}
                    className="cursor-pointer"
                  >
                    {tag.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  );
};

export default CreateQuestion;
