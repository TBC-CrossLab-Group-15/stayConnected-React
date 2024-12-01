import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";
import Heading from "@/components/ui/heading";
import { Textarea } from "@/components/ui/textarea";
import FancyMultiSelect from "../CreateQuestionComponents/CreateQuestion";
const CreateQuestion: React.FC = () => {
  return (
    <Container>
      <div className="py-40 flex justify-center ">
        <div className="m-auto   w-100 rounded-lg border border-gray-200 md:p-11 xl:w-[820px]">
          <Card className="m-auto flex flex-col items-center justify-center gap-8 md:w-[500px]">
            <Heading level={1}>Ask Your Question!</Heading>
            <form className="flex w-full flex-col gap-6">
              <div className="mb-[13px] ">
                <Label>Question Title</Label>
                <Input className="h-12 mt-2" />
              </div>
              <div className="mb-[20px]">
                <Label>Question Description</Label>
                <Textarea className="h-20  mt-2" />
              </div>
              <div className="flex  flex-wrap rounded-lg  w-100 border border-gray-200 p-[14px_1px] mb-[20px]">
                <Label className="mb-2">Add Tag</Label>
                <FancyMultiSelect />
              </div>
              <div className="flex items-center justify-center ">
                <Button className="w-full h-10 lg:w-100">Send</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default CreateQuestion;
