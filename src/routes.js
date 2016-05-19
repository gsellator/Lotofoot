import InitActions from "./pages/InitActions";

import LoginPage from "./pages/LoginPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import RecoverInitPage from "./pages/RecoverInitPage";
import RecoverPage from "./pages/RecoverPage";

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
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
    action: InitActions.home
  },
  homeNew: {
    path: "/?msg=new",
    method: "get",
    handler: HomePage,
    action: InitActions.home
  },
  game: {
    path: "/games/:gameId",
    method: "get",
    handler: GamePage,
    action: InitActions.game
  },
  ranking: {
    path: "/ranking",
    method: "get",
    handler: RankingPage,
    action: InitActions.ranking
  },
  chat: {
    path: "/chat",
    method: "get",
    handler: ChatPage,
    action: InitActions.chat
  },
  help: {
    path: "/help",
    method: "get",
    handler: HelpPage,
    action: InitActions.help
  },

  logout: {
    path: "/logout",
    method: "get",
    handler: LogoutPage
  },
};
