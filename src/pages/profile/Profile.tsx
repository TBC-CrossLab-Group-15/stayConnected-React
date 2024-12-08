import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { changeAvatar } from "@/api/profile";
import { GetUser } from "@/api/auth";
import UseLogoutClick from "@/hooks/onLogoutClick";
import { useNavigate } from "react-router-dom";
import MyQuestions from "./components/my-questions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAtom } from "jotai";
import { userIconAtom } from "@/store/authIcon";

const Profile: React.FC = () => {
  const userId = Number(localStorage.getItem("userId"));
  const { control, handleSubmit } = useForm({
    defaultValues: {
      avatarIcon: {
        value: "",
        label: "",
      },
    },
  });
  const [, setUserIcon] = useAtom(userIconAtom);

  const { t } = useTranslation();
  const { data, refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: GetUser,
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    UseLogoutClick();
    navigate("/login");
  };
  const { mutate: setAvatar } = useMutation({
    mutationKey: ["avatar"],
    mutationFn: changeAvatar,
    onSuccess: () => refetch(),
  });

  const avatar = createAvatar(avataaars, {
    seed: data?.avatar ?? "", // in here i want to put avatarIcon : {value}
  });
  const svg = avatar.toString();
  const encodedSvg = encodeURIComponent(svg).replace(/%20/g, " ");
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

  const onSubmit = (data: { avatarIcon: { value: string; label: string } }) => {
    const avatarValue = data.avatarIcon.value;
    setAvatar({ id: userId, avatar: avatarValue });
    setUserIcon(data?.avatarIcon.value);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full  border m-auto max-w-3xl  bg-white  dark:bg-gray-900 rounded-xl shadow-xl p-1 sm:p-8 space-y-8">
      {/* Profile Header */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-200 tracking-tight">
        {t("profile")}
      </h2>
      <Tabs defaultValue="account" className="flex flex-col  gap-5  ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">{t("account")}</TabsTrigger>
          <TabsTrigger value="myPosts">{t("posts")}</TabsTrigger>
        </TabsList>

        {/* Avatar and User Info */}
        <TabsContent className="flex flex-col gap-5  " value="account">
          <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg gap-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-48 h-48 rounded-full overflow-hidden hover:scale-105 transform transition-all duration-300">
              <Avatar className="rounded-full w-full h-full">
                <AvatarImage
                  className="object-cover w-full h-full"
                  src={dataUrl}
                  alt="Avatar"
                />
                <AvatarFallback>{data?.first_name}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col w-full md:w-2/3 items-center md:items-start text-center md:text-left space-y-2">
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {data ? `${data?.first_name} ${data?.last_name}` : "User Name"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {data?.email ?? "example@gmail.com"}
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col md:flex-row items-center gap-4 w-full"
              >
                <Controller
                  name="avatarIcon"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-2/3"
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
                  variant="secondary"
                  className="w-full hover:bg-teal-300  sm:w-1/3 md:w-20 lg:w-20 text-lg font-semibold    transition-all duration-300"
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
        </TabsContent>

        {/* My Posts */}
        <TabsContent className="flex flex-col    gap-5" value="myPosts">
          <ScrollArea className="rounded-md  ">
            <MyQuestions />
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleLogout}
          className="w-full sm:w-full  hover:bg-teal-300 text-lg  transition-all duration-300 transform hover:scale-105"
          variant={"secondary"}
        >
          {t("logout")}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
