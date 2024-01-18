import React, { createContext, useState, ReactNode } from "react";

interface SnackbarContextValue {
  snackbarOpen: boolean;
  showSnackbar: () => void;
  closeSnackbar: () => void;
}

const defaultSnackbarContextValue: SnackbarContextValue = {
  snackbarOpen: false,
  showSnackbar: () => {},
  closeSnackbar: () => {},
};

export const SnackbarContext = createContext<SnackbarContextValue>(
  defaultSnackbarContextValue
);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackbar = () => {
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{ snackbarOpen, showSnackbar, closeSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
