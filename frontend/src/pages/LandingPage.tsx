import { useRef } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Context";

const LandingPage = () => {
  const roomInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const joinFunction = () => {
    const username = usernameInput.current?.value;
    const roomId = roomInput.current?.value;

    if (!username || !roomId) {
      return console.error("Username and RoomId is not given.");
    }

    setUser(username, roomId);
    navigate("/chat");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      joinFunction();
    }
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto px-4 flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center p-6 rounded-md bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-900 gap-3 shadow-sm transition-colors duration-200">
        <div className="text-black dark:text-white font-jetbrains text-2xl font-bold">
          Chat-App
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-jetbrains">
          Real-time chat made simple
        </div>
        <InputBox
          ref={usernameInput}
          placeholder="Enter your name"
          classname="w-full"
          onKeyDown={handleKeyDown}
        />
        <InputBox
          ref={roomInput}
          placeholder="Any name for RoomId"
          classname="w-full"
          onKeyDown={handleKeyDown}
        />
        <Button
          onclick={joinFunction}
          placeholder="Join room"
          classname="w-full"
        />
      </div>
    </div>
  );
};

export default LandingPage;
