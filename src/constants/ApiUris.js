const ApiUris = {
  UsersLogin: '/users/login',
  UsersMe: '/users/me',
  UsersRegister: '/users/register',
  Users: '/users',

  RecoverInit: '/recover/init/:username',
  RecoverTest: '/recover/test/:recovertoken',
  RecoverUpdate: '/recover/update/:recovertoken',

  Games: '/games',

  Predictions: '/predictions',
  PredictionsByGame: 'http://{{host}}/api/predictions?game=:gameId',
  PredictionsByUser: 'http://{{host}}/api/predictions?user=:userId',
};

export default ApiUris;
