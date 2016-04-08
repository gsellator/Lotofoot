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
    path: "/",
    method: "get",
    handler: HomePage,
    action: InitActions.home
  },
  games: {
    path: "/games",
    method: "get",
    handler: GamesPage,
    action: InitActions.games
  },
  predictions: {
    path: "/predictions",
    method: "get",
    handler: PredictionsPage,
    action: InitActions.predictions
  },
  ranking: {
    path: "/ranking",
    method: "get",
    handler: RankingPage,
    action: InitActions.ranking
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
