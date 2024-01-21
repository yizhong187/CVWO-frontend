import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomAppBar from "./components/Common/CustomAppBar";
import { routes } from "./routes/routes";
import { PostSnackbarProvider } from "./contexts/PostSnackbarContext";
import { UserProvider } from "./contexts/UserContext";
import { LoginSnackbarProvider } from "./contexts/LoginSnackbarContext";

const App: React.FC = () => {
  return (
    <LoginSnackbarProvider>
      <PostSnackbarProvider>
        <UserProvider>
          <Router>
            <CustomAppBar />
            <Routes>
              {routes.map((route, index) => {
                const Component = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
            </Routes>
          </Router>
        </UserProvider>
      </PostSnackbarProvider>
    </LoginSnackbarProvider>
  );
};

export default App;
