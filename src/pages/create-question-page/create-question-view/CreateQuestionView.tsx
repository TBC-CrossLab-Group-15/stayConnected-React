import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Heading from "@/components/ui/heading";
import { Textarea } from "@/components/ui/textarea";
import FancyMultiSelect from "../Components/CreateQuestion";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { CreateQuestionAPI } from "../../../api/createQuestion/index";
import { useState } from "react";

export interface CreateQuestionType {
  title: string;
  description: string;
  tags: number[];
}

const CreateQuestionView: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);

  const mutation = useMutation({
    mutationKey: ["CreateQuestion"],
    mutationFn: CreateQuestionAPI,
    onSuccess: (data) => {
      console.log("Question posted successfully:", data);
      alert(t("questionCreatedSuccessfully"));
    },
    onError: (error) => {
      console.error("Failed to create question:", error);
      alert(t("failedToCreateQuestion"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !text) {
      alert(t("pleaseFillAllFields"));
      return;
    }
    const tagIds = tags.map((tag) => tag.id);
    mutation.mutate({ title, text, tags: tagIds });
    setTitle("");
    setText("");
    setTags([]);
  };
  return (
    <Container>
      <div className="py-40 flex justify-center">
        <div className="m-auto w-full rounded-lg border border-gray-200 md:p-11 xl:w-[820px]">
          <Card className="m-auto flex flex-col items-center justify-center gap-8 md:w-[500px]">
            <Heading level={1}>{t("askQuestion")}</Heading>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-6"
            >
              <div>
                <Label>{t("questionTitle")}</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 mt-2 border-primary"
                />
              </div>
              <div>
                <Label>{t("questionDescription")}</Label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="h-20 mt-2 border-primary resize-none"
                />
              </div>
              <div>
                <div className="mb-2">
                  <Label>{t("addTag")}</Label>
                </div>
                <FancyMultiSelect selected={tags} onChange={setTags} />
              </div>
              <Button
                variant={"secondary"}
                type="submit"
                disabled={mutation.status === "pending"}
                className="w-full h-10 lg:w-100 "
              >
                {mutation.status === "pending" ? t("sending") : t("send")}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default CreateQuestionView;
