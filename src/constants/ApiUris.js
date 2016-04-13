const ApiUris = {
  UsersLogin: '/users/login',
  UsersMe: '/users/me',
  UsersRegister: '/users/register',
  Users: '/users',

  RecoverInit: '/recover/init/:username',
  RecoverTest: '/recover/test/:recovertoken',
  RecoverUpdate: '/recover/update/:recovertoken',

  Teams: '/teams',

  Games: '/games', // GET POST
  Game: '/games/:gameId', // GET POST
  GamesNext: '/games/next',

  Predictions: '/predictions', // GET POST
  Prediction: '/predictions/:predictionId', // GET PUT
  PredictionsByGame: '/predictions?user=:userId&game=:gameId',
  PredictionsByUser: '/predictions?user=:userId',
};

export default ApiUris;
