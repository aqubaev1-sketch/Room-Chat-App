import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type UserContextType = {
  username: string;
  roomId: string;
  socket: WebSocket | null;
  setUser: (username: string, roomId: string) => void;
  connectSocket: () => WebSocket;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("chat-user");
    const roomId = localStorage.getItem("chat-room");
    if (username && roomId) {
      setUsername(username);
      setRoomId(roomId);
    }
  }, []);

  const setUser = (username: string, roomId: string) => {
    setUsername(username);
    setRoomId(roomId);
    localStorage.setItem("chat-user", username);
    localStorage.setItem("chat-room", roomId);
  };

  const connectSocket = () => {
    if(socketRef.current) {
      return socketRef.current;
    }
    const ws = new WebSocket(import.meta.env.VITE_WS_URL);

    ws.onopen = () => {
      console.log("socket connected");
    };

    socketRef.current = ws;
    setSocket(ws);

    return ws;
  };

  return (
    <UserContext.Provider
      value={{ username, roomId, setUser, socket, connectSocket }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUser must be used inside the UserData provider");
  return ctx;
};
