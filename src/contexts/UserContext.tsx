import React, { createContext, Dispatch, SetStateAction } from "react";
import { UserModel } from "../interfaces/UserModel";

interface UserContext {
  user: UserModel | null;
  setUser: Dispatch<SetStateAction<UserModel | null>>;
}

export const UserContext = createContext<UserContext | null>(null);
