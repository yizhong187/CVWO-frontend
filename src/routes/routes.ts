import HomePage from "../pages/HomePage";
import SubforumPage from "../pages/SubforumPage";
import ThreadPage from "../pages/ThreadPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AccountSettingsPage from "../pages/AccountSettingsPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

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
  { path: "/account-settings", component: AccountSettingsPage },
  { path: "/profile/:userName", component: ProfilePage },

  // Fallback route for any undefined paths, leading to a '404 Not Found' page
  { path: "*", component: NotFoundPage },
];
