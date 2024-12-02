import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Languages } from "lucide-react";
import i18n from "@/i18n";
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md cursor-pointer">
        <Languages className="w-5 h-5 text-gray-700" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-md rounded-md p-2">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          <Button
            onClick={() => changeLanguage("en")}
            variant="ghost"
            className="flex items-center text"
          >
            {t("language.english")}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("ka")}>
          <Button
            onClick={() => changeLanguage("en")}
            variant="ghost"
            className="flex items-center "
          >
            {t("language.georgian")}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
