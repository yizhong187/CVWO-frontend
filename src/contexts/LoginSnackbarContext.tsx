import React, { createContext, useState, ReactNode } from "react";

interface LoginSnackbarContextValue {
  loginSnackbarOpen: boolean;
  loginSnackbarTrigger: string;
  showLoginSnackbar: () => void;
  closeLoginSnackbar: () => void;
  setLoginSnackbarTrigger: (trigger: string) => void;
}

const defaultLoginSnackbarContextValue: LoginSnackbarContextValue = {
  loginSnackbarOpen: false,
  loginSnackbarTrigger: "",
  showLoginSnackbar: () => {},
  closeLoginSnackbar: () => {},
  setLoginSnackbarTrigger: () => {},
};

export const LoginSnackbarContext = createContext<LoginSnackbarContextValue>(
  defaultLoginSnackbarContextValue
);

interface LoginSnackbarProviderProps {
  children: ReactNode; // Accepts any ReactNode as children
}

// LoginSnackbarProvider component to provide LoginSnackbarContext to its children
export const LoginSnackbarProvider: React.FC<LoginSnackbarProviderProps> = ({
  children,
}) => {
  const [loginSnackbarOpen, setLoginSnackbarOpen] = useState(false);
  const [loginSnackbarTrigger, setLoginSnackbarTrigger] = useState("");

  // Function to show the login snackbar
  const showLoginSnackbar = () => {
    setLoginSnackbarOpen(true);
  };

  // Function to close the login snackbar
  const closeLoginSnackbar = () => {
    setLoginSnackbarOpen(false);
  };

  return (
    <LoginSnackbarContext.Provider
      value={{
        loginSnackbarOpen,
        loginSnackbarTrigger,
        showLoginSnackbar,
        closeLoginSnackbar,
        setLoginSnackbarTrigger,
      }}
    >
      {children}
    </LoginSnackbarContext.Provider>
  );
};
