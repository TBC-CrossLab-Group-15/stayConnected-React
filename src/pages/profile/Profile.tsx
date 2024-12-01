import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";

const Profile: React.FC = () => {
  return (
    <div className="w-full border m-auto max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-10 space-y-8">
      {/* Profile Header */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-200 tracking-tight">
        Profile
      </h2>

      {/* Avatar and User Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg gap-6 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex justify-center w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-blue-500 hover:scale-105 transform transition-all duration-300">
          <Avatar className="rounded-full">
            <AvatarImage
              className="w-full h-full object-cover rounded-full"
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Giorgi
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            example@gmail.com
          </p>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-6 hover:shadow-xl transition-shadow duration-300">
        <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Information
        </p>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <p className="text-lg">Score</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            25
          </p>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <p className="text-lg">Answered Questions</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            10
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center">
        <Button className="bg-sky-500 w-full md:w-auto text-white hover:bg-sky-600 rounded-md px-6 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
