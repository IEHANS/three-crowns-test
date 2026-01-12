"use client";

import { createContext, useContext, useState, useEffect } from "react";

const MyPlayerContext = createContext<{
  myPlayerId: string | null;
  setMyPlayerId: (id: string | null) => void;
}>({
  myPlayerId: null,
  setMyPlayerId: () => {},
});

export function MyPlayerProvider({ children }: { children: React.ReactNode }) {
  const [myPlayerId, setMyPlayerId] = useState<string | null>(null);

  useEffect(() => {
    setMyPlayerId(localStorage.getItem("myPlayerId"));
  }, []);

  const update = (id: string | null) => {
    if (id) {
      localStorage.setItem("myPlayerId", id);
    } else {
      localStorage.removeItem("myPlayerId");
    }
    setMyPlayerId(id);
  };

  return (
    <MyPlayerContext.Provider value={{ myPlayerId, setMyPlayerId: update }}>
      {children}
    </MyPlayerContext.Provider>
  );
}

export function useMyPlayer() {
  return useContext(MyPlayerContext);
}