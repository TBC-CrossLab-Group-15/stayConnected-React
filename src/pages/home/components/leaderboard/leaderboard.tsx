import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Leaderboard = () => {
  return (
    <>
      <Card className="mt-8 font-sans p-3 flex flex-col items-center dark:border-solid dark:border-neutral-800">
        <CardHeader className="flex items-center font-sans">
          <CardTitle className="text-xl">LeaderBoard</CardTitle>
          <CardDescription className="text-lg">
            Top 10 users with most correct answers
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-7">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-sans">John Doe</h1>
          <h1 className="text-lg font-sans text-neutral-500">
            Correct Answers: 100
          </h1>
        </CardContent>
        <CardContent className="flex items-center gap-7">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-sans">John Doe</h1>
          <h1 className="text-lg font-sans text-neutral-500">
            Correct Answers: 100
          </h1>
        </CardContent>
        <CardContent className="flex items-center gap-7">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-sans">John Doe</h1>
          <h1 className="text-lg font-sans text-neutral-500">
            Correct Answers: 100
          </h1>
        </CardContent>
        <CardContent className="flex items-center gap-7">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-sans">John Doe</h1>
          <h1 className="text-lg font-sans text-neutral-500">
            Correct Answers: 100
          </h1>
        </CardContent>

        <CardFooter className="flex justify-center text-neutral-500">
          <p>Answer questions to become one of them!</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default Leaderboard;
