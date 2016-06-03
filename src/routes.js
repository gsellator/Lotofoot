import InitActions from "./pages/InitActions";

import LoginPage from "./pages/LoginPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import RecoverInitPage from "./pages/RecoverInitPage";
import RecoverPage from "./pages/RecoverPage";

import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import RankingPage from "./pages/RankingPage";
import ChatPage from "./pages/ChatPage";
import HelpPage from "./pages/HelpPage";
import LogoutPage from "./pages/LogoutPage";

export default {
  login: {
    path: "/login",
    method: "get",
    handler: LoginPage
  },
  userRegister: {
    path: "/login/create",
    method: "get",
    handler: UserRegisterPage,
  },
  
  // RECOVER
  recoverInit: {
    path: "/recover",
    method: "get",
    handler: RecoverInitPage,
    action: InitActions.recoverInit
  },
  recover: {
    path: "/recover/:recovertoken",
    method: "get",
    handler: RecoverPage,
    action: InitActions.recover
  },

  home: {
    path: "/",
    method: "get",
    handler: HomePage,
    action: InitActions.me
  },
  games: {
    path: "/games",
    method: "get",
    handler: GamesPage,
    action: InitActions.me
  },
  gamesNew: {
    path: "/games?msg=new",
    method: "get",
    handler: GamesPage,
    action: InitActions.me
  },
  ranking: {
    path: "/ranking",
    method: "get",
    handler: RankingPage,
    action: InitActions.me
  },
  chat: {
    path: "/chat",
    method: "get",
    handler: ChatPage,
    action: InitActions.me
  },
  help: {
    path: "/help",
    method: "get",
    handler: HelpPage,
    action: InitActions.me
  },

  logout: {
    path: "/logout",
    method: "get",
    handler: LogoutPage
  },
};
