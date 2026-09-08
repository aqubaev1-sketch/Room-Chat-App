import type { InputBoxProps } from "../props/InputBoxProps";
import { cn } from "../utils/utils";

const InputBox = ({ placeholder, ref, classname, onKeyDown }: InputBoxProps) => {
  return (
    <div className="flex items-center w-full">
      <input
        className={cn(
          "rounded-md text-center bg-gray-50 dark:bg-neutral-900 text-black dark:text-white border border-gray-300 dark:border-neutral-800 font-jetbrains w-full h-10 focus:outline-[0.5px] focus:outline-neutral-400 dark:focus:outline-neutral-600 text-sm transition-colors duration-200",
          classname,
        )}
        placeholder={placeholder}
        ref={ref}
        type="text"
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default InputBox;
