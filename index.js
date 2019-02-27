const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to our Scrum Master's Website</h1>`);
});

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

const port = 3000;
app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
);
