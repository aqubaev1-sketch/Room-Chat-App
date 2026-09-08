import type { MessageProps } from "../props/MessageProps";
import { cn } from "../utils/utils";

const ReceiveMessage = ({ message, username, className }: MessageProps) => {
  return (
    <div className={cn("flex flex-col items-start gap-1 w-full", className)}>
      <div className="flex items-center justify-center border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-black dark:text-neutral-200 rounded-md px-4 text-sm py-2 min-h-8 max-w-[85%] wrap-break-word text-left transition-colors duration-200">
        {message}
      </div>
      <div className="flex justify-center items-center bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-neutral-300 text-xs rounded-md px-3 py-1 h-6 transition-colors duration-200">
        {username}
      </div>
    </div>
  );
};

export default ReceiveMessage;
