console.log("START index.js");

delete process.env.BROWSER;

if (process.env.NODE_ENV === "development") {
  require("babel-register");
  require("./src/server");
} else {
  require("./lib/server");
}
