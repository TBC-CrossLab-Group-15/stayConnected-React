import { useMutation, useQuery } from "@tanstack/react-query";
import { getTags } from "@/api/tags";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { filterByTag, filterByText } from "@/api/question";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

interface SearchProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilter: (data: any) => void;
}

const Search: FC<SearchProps> = ({ onFilter }) => {
  const {
    data: tagsData = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const navigate = useNavigate();
  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      searchText: "",
      selectedTag: "",
    },
  });

  const searchText = watch("searchText");
  const selectedTag = watch("selectedTag");

  const { data, mutate: filteredTag } = useMutation({
    mutationKey: ["filtertag"],
    mutationFn: () => filterByTag({ tag: selectedTag }),
    onSuccess: (data) => {
      refetch();
      onFilter(data);
    },
    onError: (error) => {
      console.error("Failed To Filter", error);
    },
  });
  console.log("mutationData:", data);

  const { data: filteredquestionsText, mutate: filteredText } = useMutation({
    mutationKey: ["filtertext"],
    mutationFn: () => filterByText({ tag: searchText }),
    onSuccess: (filteredquestionsText) => {
      refetch();
      onFilter(filteredquestionsText);
    },
    onError: (error) => {
      console.error("Failed To Filter", error);
    },
  });
  console.log("text filter:", filteredquestionsText);

  const onSubmit = () => {
    if (selectedTag) {
      navigate(`?tag=${selectedTag}`);
      filteredTag();
    } else {
      navigate(`?text=${searchText}`);
      filteredText();
    }
  };

  if (isError) {
    return <div>Error loading tags: {error?.message || "Unknown error"}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-[1200px] mx-auto px-5 mt-8 mb-8 font-sans flex gap-5">
        {/* Input Field */}
        <Command className="rounded-lg border shadow-md md:min-w-[300px] w-3/4 dark:border-solid dark:border-neutral-800">
          <Controller
            name="searchText"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Type a command or choose a tag..."
                disabled={!!selectedTag}
                className="h-10 p-2 shadow-md dark:bg-inherit "
              />
            )}
          />
        </Command>

        <Controller
          name="selectedTag"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setValue("searchText", "");
              }}
              disabled={!!searchText}
            >
              <SelectTrigger className="md:min-w-[150px] w-1/4 h-10 rounded-lg border shadow-md">
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
          )}
        />

        <Button type="submit" variant="primary" className="hover:bg-cyan-200">
          Search
        </Button>
      </div>
    </form>
  );
};

export default Search;
