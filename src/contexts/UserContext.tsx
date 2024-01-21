import React, { createContext, useState, ReactNode, useEffect } from "react";
import { UserModel } from "../interfaces/UserModel";

interface UserContextProps {
  user: UserModel | null;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
}

const defaultUserContextValue: UserContextProps = {
  user: null, // Initially, no user is logged in
  setUser: () => {},
};

export const UserContext = createContext<UserContextProps>(
  defaultUserContextValue
);

// Accepts any ReactNode as children
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component to provide UserContext to its children
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    // Effect to load the user data from session storage on component mount
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const userState: UserModel = JSON.parse(storedUser);
        setUser(userState); // Set the user state if found in session storage
      } catch (error) {
        console.error("Error parsing user data from session storage", error);
        sessionStorage.removeItem("user"); // Remove corrupted data from storage
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
