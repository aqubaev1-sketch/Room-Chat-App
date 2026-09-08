import type { ButtonProps } from "../props/ButtonProps";
import { cn } from "../utils/utils";

const Button = ({ onclick, placeholder, classname }: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      className={cn(
        "flex justify-center items-center font-jetbrains w-full h-10 bg-neutral-800 dark:bg-neutral-800 border border-neutral-700 dark:border-neutral-700 text-white rounded-md cursor-pointer hover:bg-black dark:hover:bg-black text-sm transition-colors duration-200",
        classname,
      )}
    >
      {placeholder}
    </button>
  );
};

export default Button;
