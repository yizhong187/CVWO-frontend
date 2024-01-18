// src/routers/routes.ts
import HomePage from "../pages/HomePage";
import SubforumPage from "../pages/SubforumPage";
import ThreadPage from "../pages/ThreadPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

export interface Route {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export const routes: Route[] = [
  { path: "/", component: HomePage, exact: true },
  { path: "/subforums/:subforumID", component: SubforumPage },
  { path: "/subforums/:subforumID/threads/:threadID", component: ThreadPage },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignUpPage },
];
