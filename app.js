const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const postList = require("./views/postLists")
const postDetails = require("./views/postDetails")
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'))
app.get("/", (req, res) => {
  const posts = postBank.list()
  res.send(postList(posts)) 
});
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  res.send(postDetails(post))
});
app.use((error, req, res, next) => {
  console.error("there is an error: ", error);
  if (res.statusCode < 400) {
    res.status(500);
  }
  res.send({ error: error.message, message: error.message });
});
const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
