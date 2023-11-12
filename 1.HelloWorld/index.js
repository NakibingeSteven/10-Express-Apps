const express = require("express");
const app = express();

//port
const PORT = process.env.PORT || 5000;

//name
const name = "Nakibinge Steven Adrian";

//route for base url
app.get("/", (req, res) => {
  res.send(`Hello ${name} to Node`);
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
