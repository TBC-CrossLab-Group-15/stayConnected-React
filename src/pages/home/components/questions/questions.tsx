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
        className={`rounded-xl border-solid  border-b border-zinc-200 bg-card text-card-foreground shadow h-[250px] ${width} mb-5`}
      >
        <CardHeader>
          <CardTitle>Question 1</CardTitle>
          <CardDescription>
            {" "}
            <NavLink to="/author" className="hover:underline">
              John Doe,
            </NavLink>{" "}
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
        <CardFooter>
          <p className="bg-slate-300 w-23 rounded-sm">Technology</p>
        </CardFooter>
      </Card>
      <Card
        className={`rounded-xl border-solid border-b border-zinc-200 bg-card text-card-foreground shadow h-[250px] ${width} mb-5`}
      >
        <CardHeader>
          <CardTitle>Question 2</CardTitle>
          <CardDescription>
            <NavLink to="/author" className="hover:underline">
              {" "}
              John Doe,
            </NavLink>{" "}
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
        <CardFooter>
          <p className="bg-slate-300 w-23 rounded-sm">Technology</p>
        </CardFooter>
      </Card>
      <Card
        className={`rounded-xl border-solid border-b border-zinc-200 bg-card text-card-foreground shadow h-[250px] ${width} mb-5`}
      >
        <CardHeader>
          <CardTitle>Question 3</CardTitle>
          <CardDescription>
            <NavLink to="/author" className="hover:underline">
              {" "}
              John Doe,
            </NavLink>{" "}
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
        <CardFooter>
          <p className="bg-slate-300 w-23 rounded-sm">Technology</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Questions;
