import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Person from "../person";

const QuestionContainer = () => {
  const persons = ["giorgi", "gvanca", "elene", "teona", "rati"]; // Placeholder for persons who answered

  return (
    <div className="bg-gray-50  overflow-hidden dark:bg-black p-6 md:p-8 lg:p-10 border  dark:border-gray-700 rounded-lg shadow-md flex flex-col gap-14">
      {/* Question Header */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Question Title
          </h2>
          <div className="flex gap-4">
            <Button className="text-gray-600 dark:text-gray-300" variant="link">
              Author
            </Button>
            <Button className="text-gray-600 dark:text-gray-300" variant="link">
              Date Time
            </Button>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          კითხვის აღწერილობა კითხვის აღწერილობა კითხვის აღწერილობა კითხვის
          აღწერილობა კითხვის აღწერილობა კითხვის აღწერილობა კითხვის აღწერილობა
          კითხვის აღწერილობა კითხვის აღწერილობა კითხვის აღწერილობა...
        </p>
      </div>

      {/* Question Body */}
      <div className="flex flex-col gap-6 ">
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
          Answers
        </h3>
        <div className="max-h-[300px]  overflow-y-auto flex flex-col gap-4 pr-10 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent dark:scrollbar-thumb-blue-700 dark:scrollbar-track-transparent">
          {persons.map((index) => (
            <Person key={index} />
          ))}
        </div>
      </div>

      {/* Question Footer */}
      <div className="flex items-center gap-4 ">
        <Textarea className="flex-1" placeholder="Type your message here." />
        <Button
          className="h-full bg-blue-700 text-white dark:bg-black dark:text-white"
          variant="outline"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default QuestionContainer;
