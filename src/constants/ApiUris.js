const ApiUris = {
  UsersLogin: '/users/login',
  UsersMe: '/users/me',
  UsersRegister: '/users/register',
  Users: '/users',

  Games: '/games',

  Predictions: '/predictions',
  PredictionsByGame: 'http://{{host}}/api/predictions?game=:gameId',
  PredictionsByUser: 'http://{{host}}/api/predictions?user=:userId',
};

export default ApiUris;
