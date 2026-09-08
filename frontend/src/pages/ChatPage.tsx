import AlertMessage from "../components/AlertMessage";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import SentMessage from "../components/SentMessage";
import ReceiveMessage from "../components/ReceiveMessage";
import { useUser } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type MessageType =
  | {
      id: string;
      type: "join" | "leave";
      message: string;
    }
  | {
      id: string;
      type: "chat";
      username: string;
      message: string;
    };

const ChatPage = () => {
  const { username, roomId, socket, setUser, connectSocket } = useUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messageInput = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasJoined = useRef(false);
  const intentionalClose = useRef(false);
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    if (!username || !roomId) {
      const localUsername = localStorage.getItem("chat-user");
      const localRoomId = localStorage.getItem("chat-room");
      if (localUsername && localRoomId) {
        setUser(localUsername, localRoomId);
      } else {
        navigate("/");
      }
    }
  }, [username, roomId]);

  useEffect(() => {
    if (!username || !roomId) return;

    if (hasJoined.current) return;

    let ws = socket;

    const PayloadMessage = JSON.stringify({
      type: "join",
      payload: {
        username: username,
        roomId: roomId,
      },
    });

    if (!ws) {
      setConnecting(true);
      ws = connectSocket();
    }

    if (ws?.readyState !== WebSocket.OPEN) {
      ws.onopen = () => {
        ws?.send(PayloadMessage);
        hasJoined.current = true;
        setConnecting(false);
      };
    } else {
      ws?.send(PayloadMessage);
      hasJoined.current = true;
      setConnecting(false);
    }
  }, [username, roomId, socket]);

  useEffect(() => {
    if (!socket) return;


      socket.onmessage = (event) => {
        try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
        } catch {
          console.log("Invalid message format");
        }
      };
  

    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const message = messageInput.current?.value.trim();

    if (!message) return;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log("socket not connected yet!");
      return;
    }

    socket?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: message,
        },
      }),
    );

    if (messageInput.current) {
      messageInput.current.value = "";
      messageInput.current.focus();
    }
  };

  const LeaveRoom = () => {
    intentionalClose.current = true;
    hasJoined.current = false;

    socket?.close();

    localStorage.removeItem("chat-user");
    localStorage.removeItem("chat-room");

    setUser("", "");
    navigate("/");
  };

  useEffect(() => {
    if (!socket) return;

    socket.onclose = () => {
      if (intentionalClose.current == true) return;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "leave",
          message: "Connection lost",
        },
      ]);
    };

    return () => {
      socket.onclose = null;
    };
  }, [socket]);

  useEffect(() => {
    const handleRefresh = () => {
      intentionalClose.current = true;
    };

    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onerror = () => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "leave",
          message: "Something went wrong",
        },
      ]);
    };

    return () => {
      socket.onerror = null;
    };
  }, [socket]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  if (connecting) {
    return (
      <div className="h-screen w-full max-w-md mx-auto px-4 flex justify-center items-center">
        <div className="bg-white dark:bg-neutral-950 rounded-md border border-gray-200 dark:border-neutral-900 p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black dark:border-neutral-700 dark:border-t-white rounded-full animate-spin" />
            <div className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains">
              Connecting to room "{roomId}"...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto px-4 flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-950 flex flex-col gap-3 items-center justify-center w-full h-[80vh] md:h-[70vh] rounded-md border border-gray-200 dark:border-neutral-900 shadow-sm p-4 transition-colors duration-200">
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-black dark:text-white font-jetbrains text-sm">
              <span className="truncate max-w-37.5">Room: {roomId}</span>
            </div>
            <Button
              onclick={LeaveRoom}
              placeholder={"Leave"}
              classname="w-20 h-8 text-xs bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/20"
            />
          </div>
          <div className="flex-1 w-full rounded-md border border-gray-200 dark:border-neutral-900 bg-gray-50 dark:bg-black p-3 overflow-hidden flex flex-col transition-colors duration-200">
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 w-full pr-1">
              {messages.map((msg) => {
                if (msg.type == "join" || msg.type == "leave") {
                  return <AlertMessage key={msg.id} message={msg.message} />;
                }
                if (msg.type == "chat") {
                  if (msg.username == username) {
                    return (
                      <SentMessage
                        key={msg.id}
                        message={msg.message}
                        username={msg.username}
                      />
                    );
                  }

                  return (
                    <ReceiveMessage
                      key={msg.id}
                      message={msg.message}
                      username={msg.username}
                    />
                  );
                }
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="flex w-full items-center gap-2 mt-1">
            <InputBox
              ref={messageInput}
              placeholder="Message..."
              classname="flex-1 w-full"
              onKeyDown={handleKeyDown}
            />
            <Button
              onclick={sendMessage}
              placeholder="Send"
              classname="w-20 h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
