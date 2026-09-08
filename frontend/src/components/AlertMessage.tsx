import type { AlertMessageProps } from "../props/AlertMessageProps";

const AlertMessage = ({ message }: AlertMessageProps) => {
  return (
    <div className="text-xs text-center mx-auto font-jetbrains w-[80%] sm:w-[60%] text-gray-500 dark:text-gray-400 my-1 transition-colors duration-200">
      {message}
    </div>
  );
};

export default AlertMessage;
