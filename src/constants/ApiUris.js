const ApiUris = {
  UsersLogin: '/users/login',
  UsersMe: '/users/me',
  UsersRegister: '/users/register',
  Users: '/users',

  RecoverInit: '/reset-password',
  RecoverTest: '/reset-password/:recovertoken',
  RecoverUpdate: '/reset-password/:recovertoken',

  Teams: '/teams',

  Games: '/games', // GET POST
  Game: '/games/:gameId', // GET POST
  GamesNext: '/games/next',

  Predictions: '/predictions', // GET POST
  Prediction: '/predictions/:predictionId', // GET PUT
  PredictionsByUser: '/predictions?user=:userId',
  PredictionsByGame: '/predictions?game=:gameId',
  PredictionsByGameAndUser: '/predictions?user=:userId&game=:gameId',

  Messages: '/messages', // GET POST
};

export default ApiUris;
