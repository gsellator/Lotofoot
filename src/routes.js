import InitActions from "./pages/InitActions";

import LoginPage from "./pages/LoginPage";
import CreateLoginPage from "./pages/CreateLoginPage";
import RecoverInitPage from "./pages/RecoverInitPage";
import RecoverPage from "./pages/RecoverPage";

//import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import GamePage from "./pages/GamePage";
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
  createLogin: {
    path: "/login/create",
    method: "get",
    handler: CreateLoginPage,
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
  games: {
    path: "/games",
    method: "get",
    handler: GamesPage,
    action: InitActions.games
  },
  game: {
    path: "/games/:gameId",
    method: "get",
    handler: GamePage,
    action: InitActions.game
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
