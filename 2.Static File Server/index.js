const express = require("express");
const path = require("path");
const patth = require("path");

//the app
const app = express();

//the port
const PORT = process.env.PORT || 5000;

//Serve the static pages from a public directory
app.use(express.static(path.join(__dirname, "public")));

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
