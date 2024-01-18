import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomAppBar from "./components/CustomAppBar";
import { UserContext } from "./contexts/UserContext";
import { UserModel } from "./interfaces/UserModel";
import { routes } from "./routes/routes";
import { SnackbarProvider } from "./contexts/LoginSnackBarContext";

const App: React.FC = () => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const userState: UserModel = JSON.parse(storedUser);
        setUser(userState);
      } catch (error) {
        console.error("Error parsing user data from session storage", error);
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <SnackbarProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <CustomAppBar />
          <Routes>
            {routes.map((route, index) => {
              const Component = route.component;
              return (
                <Route key={index} path={route.path} element={<Component />} />
              );
            })}
          </Routes>
        </Router>
      </UserContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
