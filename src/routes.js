import InitActions from "./pages/InitActions";

import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import RankingPage from "./pages/RankingPage";
import ChatPage from "./pages/ChatPage";
import HelpPage from "./pages/HelpPage";

import DemoPage from "./pages/DemoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecoverInitPage from "./pages/RecoverInitPage";
import RecoverPage from "./pages/RecoverPage";

import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";

export default {
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

  // Public
  demo: {
    path: "/demo",
    method: "get",
    handler: DemoPage,
  },
  login: {
    path: "/login",
    method: "get",
    handler: LoginPage
  },
  register: {
    path: "/login/create",
    method: "get",
    handler: RegisterPage,
    action: InitActions.register
  },
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

  logout: {
    path: "/logout",
    method: "get",
    handler: LogoutPage
  },
  notfound: {
    path: "/404",
    method: "get",
    handler: NotFoundPage
  },
  error: {
    path: "/500",
    method: "get",
    handler: ErrorPage
  }
};
