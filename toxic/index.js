const app = require("./app");
const db = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 3030;

const server = app.listen(port, () => {
  console.log("Server Listening on Port http://localhost:" + port);
});


