import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import { RouteStore } from "fluxible-router";
import cookiePlugin from 'fluxible-plugin-cookie';

import routes from "./routes";
import Application from "./Application";

import DialogStore from "./stores/Dialog/DialogStore";

import MessagesTabStore from "./stores/Chat/MessagesTabStore";
import CurrentGameStore from "./stores/Games/CurrentGameStore";
import GameModalStore from "./stores/Games/GameModalStore";
import GamesTabStore from "./stores/Games/GamesTabStore";
import ModalStore from "./stores/Predictions/ModalStore";
import PredictionsByGameTabStore from "./stores/Predictions/PredictionsByGameTabStore";
import UsersTabStore from "./stores/Ranking/UsersTabStore";
import TeamsDicoStore from "./stores/Teams/TeamsDicoStore";

import LoginStore from "./stores/Pages/LoginStore";
import NavStore from "./stores/Pages/NavStore";
import RecoverInitPageStore from "./stores/Pages/RecoverInitPageStore";
import RecoverPageStore from "./stores/Pages/RecoverPageStore";
import RegisterPageStore from "./stores/Pages/RegisterPageStore";

// Create the fluxible app using Application as root component
const app = new Fluxible({ component: Application });

// Make fetchr services respond to /api endpoint
app.plug(fetchrPlugin({ xhrPath: "/api", xhrTimeout: "300" }));

// Plug Hairfie cookie plugin for server-side and front-side cookue access
app.plug(cookiePlugin());

// Register a fluxible RouteStore
const AppRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(AppRouteStore);

// Register app-specific stores
app.registerStore(DialogStore);

app.registerStore(MessagesTabStore);
app.registerStore(CurrentGameStore);
app.registerStore(GameModalStore);
app.registerStore(GamesTabStore);
app.registerStore(ModalStore);
app.registerStore(PredictionsByGameTabStore);
app.registerStore(UsersTabStore);
app.registerStore(TeamsDicoStore);

app.registerStore(LoginStore);
app.registerStore(NavStore);
app.registerStore(RecoverInitPageStore);
app.registerStore(RecoverPageStore);
app.registerStore(RegisterPageStore);

export default app;
