import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { NavLink } from "react-router-dom";
interface myCardProps {
  width: string;
}

const Questions: React.FC<myCardProps> = ({ width }) => {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-5 h-full  mt-8 mb-8 font-sans">
      <Card
        className={`rounded-xl flex flex-col justify-center p-0 border-solid border-b border-zinc-200 bg-card text-card-foreground shadow sm:h-[320px] md:h-[300px] lg:h-[300px] xl:h-[280px] 2xl:h-[250px] ${width} mb-5`}
      >
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Question 1</CardTitle>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13Z"
                fill="#ECFDF5"
              ></path>
              <path
                d="M7.66663 12.6289L10.4289 15.3912C10.8733 15.8356 11.0956 16.0578 11.3717 16.0578C11.6478 16.0578 11.8701 15.8356 12.3145 15.3912L18.334 9.3717"
                stroke="#059669"
                stroke-width="1.6"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
          <CardDescription>
            <NavLink to="/author" className="hover:underline">
              John Doe,
            </NavLink>
            2023 Jun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
            a perspiciatis aliquam doloribus iste laudantium aliquid! Est, enim
            laboriosam accusamus, at fugit reprehenderit itaque sapiente
            voluptatibus inventore quisquam aperiam similique.
          </p>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Badge
            variant="outline"
            className="bg-[#EEF2FF] text-[#4E53A2] dark:bg-[#EEF2FF] dark:text-[#4E53A2] rounded-xl"
          >
            React
          </Badge>
          <Badge
            variant="outline"
            className="bg-[#EEF2FF] text-[#4E53A2] dark:bg-[#EEF2FF] dark:text-[#4E53A2] rounded-xl"
          >
            C++
          </Badge>
          <Badge
            variant="outline"
            className="bg-[#EEF2FF] text-[#4E53A2] dark:bg-[#EEF2FF] dark:text-[#4E53A2] rounded-xl"
          >
            C#
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Questions;
