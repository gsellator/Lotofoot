import InitActions from "./pages/InitActions";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import PredictionsPage from "./pages/PredictionsPage";
import RankingPage from "./pages/RankingPage";
import HelpPage from "./pages/HelpPage";
import LogoutPage from "./pages/LogoutPage";

export default {
  login: {
    path: "/login",
    method: "get",
    handler: LoginPage
  },

  home: {
    path: "/home",
    method: "get",
    handler: HomePage,
    action: InitActions.hub
  },
  games: {
    path: "/games",
    method: "get",
    handler: GamesPage,
    action: InitActions.hub
  },
  predictions: {
    path: "/predictions",
    method: "get",
    handler: PredictionsPage,
    action: InitActions.hub
  },
  ranking: {
    path: "/ranking",
    method: "get",
    handler: RankingPage,
    action: InitActions.hub
  },
  help: {
    path: "/help",
    method: "get",
    handler: HelpPage,
    action: InitActions.hub
  },

  logout: {
    path: "/logout",
    method: "get",
    handler: LogoutPage
  },
};
