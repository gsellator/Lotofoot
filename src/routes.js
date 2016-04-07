import InitActions from "./pages/InitActions";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import HubPage from "./pages/HubPage";
import HelpPage from "./pages/HelpPage";
import LogoutPage from "./pages/LogoutPage";

export default {
  //// PUBLIC
//  home: {
//    path: "/",
//    method: "get",
//    handler: HomePage
//  },
  login: {
    path: "/login",
    method: "get",
    handler: LoginPage
  },
  home: {
    path: "/home",
    method: "get",
    handler: HubPage,
    action: InitActions.hub
  },

  //// OTHER
  help: {
    path: "/help",
    method: "get",
    handler: HelpPage,
  },
  logout: {
    path: "/logout",
    method: "get",
    handler: LogoutPage
  },
};
