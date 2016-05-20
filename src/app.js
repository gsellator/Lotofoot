import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import { RouteStore } from "fluxible-router";
import cookiePlugin from 'fluxible-plugin-cookie';

import routes from "./routes";
import Application from "./Application";

import AccountDialogStore from "./stores/Dialog/AccountDialogStore";
import DialogStore from "./stores/Dialog/DialogStore";

import MessagesTabStore from "./stores/Chat/MessagesTabStore";
import CurrentGameStore from "./stores/Games/CurrentGameStore";
import GameBlockStore from "./stores/Games/GameBlockStore";
import GameModalStore from "./stores/Games/GameModalStore";
import GamesTabStore from "./stores/Games/GamesTabStore";
import PredictionBlockStore from "./stores/Predictions/PredictionBlockStore";
import PredictionsByGameTabStore from "./stores/Predictions/PredictionsByGameTabStore";
import UsersTabStore from "./stores/Ranking/UsersTabStore";
import TeamsDicoStore from "./stores/Teams/TeamsDicoStore";

import HtmlHeadStore from "./stores/Pages/HtmlHeadStore";
import LoginPageStore from "./stores/Pages/LoginPageStore";
import NavStore from "./stores/Pages/NavStore";
import RecoverInitPageStore from "./stores/Pages/RecoverInitPageStore";
import RecoverPageStore from "./stores/Pages/RecoverPageStore";
import UserRegisterPageStore from "./stores/Pages/UserRegisterPageStore";


if (process.env.BROWSER) {
  require('./assets/static/icns.svg');
  require('./assets/static/icns_36x36.png');
  require('./assets/static/icns_48x48.png');
  require('./assets/static/icns_57x57.png');
  require('./assets/static/icns_60x60.png');
  require('./assets/static/icns_72x72.png');
  require('./assets/static/icns_76x76.png');
  require('./assets/static/icns_96x96.png');
  require('./assets/static/icns_114x114.png');
  require('./assets/static/icns_120x120.png');
  require('./assets/static/icns_120x120-pre.png');
  require('./assets/static/icns_144x144.png');
  require('./assets/static/icns_150x150.png');
  require('./assets/static/icns_152x152.png');
  require('./assets/static/icns_180x180.png');
  require('./assets/static/icns_192x192.png');
  require('./assets/static/icns_192x192-pre.png');
  require('./assets/static/icns_browserconfig.xml');
  require('./assets/static/icns_fav_32x32.png');
  require('./assets/static/icns_fav_96x96.png');
  require('./assets/static/icns_manifest.json');
  require('./assets/static/icns_manifest-pre.json');
  require('./assets/static/icns_ms_70x70.png');
  require('./assets/static/icns_ms_144x144.png');
  require('./assets/static/icns_ms_150x150.png');
  require('./assets/static/icns_ms_310x150.png');
  require('./assets/static/icns_ms_310x310.png');
}

// Create the fluxible app using Application as root component
const app = new Fluxible({ component: Application });

// Make fetchr services respond to /api endpoint
app.plug(fetchrPlugin({ xhrPath: "/api" }));

// Plug Hairfie cookie plugin for server-side and front-side cookue access
app.plug(cookiePlugin());

// Register a fluxible RouteStore
const AppRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(AppRouteStore);

// Register app-specific stores
app.registerStore(AccountDialogStore);
app.registerStore(DialogStore);

app.registerStore(MessagesTabStore);
app.registerStore(CurrentGameStore);
app.registerStore(GameBlockStore);
app.registerStore(GameModalStore);
app.registerStore(GamesTabStore);
app.registerStore(PredictionBlockStore);
app.registerStore(PredictionsByGameTabStore);
app.registerStore(UsersTabStore);
app.registerStore(TeamsDicoStore);

app.registerStore(HtmlHeadStore);
app.registerStore(LoginPageStore);
app.registerStore(NavStore);
app.registerStore(RecoverInitPageStore);
app.registerStore(RecoverPageStore);
app.registerStore(UserRegisterPageStore);

export default app;
