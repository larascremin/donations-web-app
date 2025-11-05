import React, { createContext, useState, useEffect } from "react";
import { mockUsers as initialMockUsers, mockUsers } from "../services/Mock";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [mockUsers, setMockUsers] = useState(() => {
    const savedMock = localStorage.getItem("mockUsers");
    return savedMock ? JSON.parse(savedMock) : initialMockUsers;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
  }, [mockUsers]);

  return (
    <UserContext.Provider value={{ user, setUser, mockUsers, setMockUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export function saveMockData() {
  localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
}
