import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { changeAvagar, getUser } from "@/api/profile";

const Profile: React.FC = () => {
  const userId = Number(localStorage.getItem("userId")); //იუზერის აიდი
  const { control, handleSubmit } = useForm({
    defaultValues: {
      avatarIcon: {
        value: "",
        label: "",
      },
    },
  });

  const { t } = useTranslation();
  const { data, refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUser,
  });

  const { mutate: setAvatar } = useMutation({
    mutationKey: ["avatar"],
    mutationFn: changeAvagar,
    onSuccess: () => refetch(),
  });

  const avatar = createAvatar(avataaars, {
    seed: data?.avatar ?? "", // in here i whant to put avatarIcon : {value}
  });
  const svg = avatar.toString();
  const encodedSvg = encodeURIComponent(svg).replace(/%20/g, " ");
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

  const onSubmit = (data: { avatarIcon: { value: string; label: string } }) => {
    const avatarValue = data.avatarIcon.value;
    setAvatar({ id: userId, avatar: avatarValue });
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full border m-auto max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-10 space-y-8">
      {/* Profile Header */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-200 tracking-tight">
        {t("profile")}
      </h2>

      {/* Avatar and User Info */}
      <div className="flex  flex-col  md:flex-row items-center md:items-start bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg gap-6 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center w-[30%]  justify-center  md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-blue-500 hover:scale-105 transform transition-all duration-300">
          <Avatar className="rounded-full w-full h-full">
            <AvatarImage
              className=" object-cover rounded-full w-full h-full "
              src={dataUrl}
              alt="Avatar"
            />
            <AvatarFallback>{data?.first_name}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col w-[60%]   items-center md:items-start text-center md:text-left space-y-2">
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {data ? data?.first_name + " " + data?.last_name : "User Name"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data?.email ?? "example@gmail.com"}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex  flex-col pt-10 md:flex-row lg:flex-row items-center  gap-2 w-full "
          >
            <Controller
              name="avatarIcon"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-3/4 sm:w-1/3 md:w-1/3 lg:w-1/3 "
                  {...field}
                  options={[
                    { value: "Eden", label: "Eden" },
                    { value: "Sadie", label: "Sadie" },
                    { value: "Sara", label: "Sara" },
                    { value: "Oliver", label: "Oliver" },
                    { value: "Mason", label: "Mason" },
                    { value: "Amaya", label: "Amaya" },
                    { value: "Alexander", label: "Alexander" },
                    { value: "Jameson", label: "Jameson" },
                    { value: "Brian", label: "Brian" },
                    { value: "Brooklynn", label: "Brooklynn" },
                    { value: "Aiden", label: "Aiden" },
                    { value: "Sawyer", label: "Sawyer" },
                    { value: "Sophia", label: "Sophia" },
                    { value: "Destiny", label: "Destiny" },
                    { value: "Kingston", label: "Kingston" },
                    { value: "Caleb", label: "Caleb" },
                    { value: "Chase", label: "Chase" },
                    { value: "Aidan", label: "Aidan" },
                    { value: "Adrian", label: "Adrian" },
                    { value: "Leo", label: "Leo" },
                  ]}
                />
              )}
            />
            <Button
              variant={"outline"}
              className="w-3/4 sm:w-1/3 md:w-20 lg:w-20 "
              type="submit"
            >
              {t("change")}
            </Button>
          </form>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-6 hover:shadow-xl transition-shadow duration-300">
        <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {t("information")}
        </p>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <p className="text-lg">{t("score")}</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {data?.rating ?? "0"}
          </p>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <p className="text-lg">{t("answeredQuestions")}</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {data?.my_answers ?? "0"}
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center">
        <Button className="bg-sky-500 w-full md:w-auto text-white hover:bg-sky-600 rounded-md px-6 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
          {t("logout")}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
