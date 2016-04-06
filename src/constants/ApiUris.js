const ApiUris = {
  //// PUBLIC
  PublicApps: '/public/apps',


  //// STANDARD
  MyAccount: '/myaccount',
  MyAccountModify: '/myaccount',
  MyAccountPswdModify: '/myaccountpswd',
  MyApps: '/myapps',


  //// EDITOR


  //// ADMIN
  // RECOVER
  RecoverInit: '/recover/init/:username',
  RecoverTest: '/recover/test/:recovertoken',
  RecoverUpdate: '/recover/update/:recovertoken',

  // USER
  Users: '/users',
  UsersFromGroup: '/users/group/:group',
  User: '/user/:username',
  UserCreate: '/user',
  UserModify: '/user/:userid',
  UserDelete: '/user/:userid/delete',

  // AUTH
  Auths: '/auths',
  AuthsFromGroup: '/auths/group/:group',
  AuthsFromUsername: '/auths/user/:username',
  AuthsFromApp: '/auths/app/:app',
  AuthCreate: '/auth',
  AuthDelete: '/auth/:authid/delete',

  // APP
  RefApps: '/refapps',
  Apps: '/apps',
  App: '/app/:app',

  // GROUP
  RefGroups: '/refgroups',
  Groups: '/groups',
  Group: '/group/:group',

  // PREFS
  Prefs: '/prefs',
  PrefsFromUser: '/user/:username/prefs',
  PrefDelete: '/pref/:prefid/delete',
};

export default ApiUris;
