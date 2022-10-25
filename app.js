const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank")
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'))



app.get("/", (req, res) => {

  const posts = postBank.list()

  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />

    </head>
    <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}"> ${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`

  res.send(html);
});



app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  // const posts = postBank.list()
  const post = postBank.find(id);
  if (!post.id) {
    throw new Error('Not Found')
  } else {
  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
      
    </head>
    <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
            <div>${post.content}</div>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>
    </div>
  </body>
</html>`

  res.send(html);}
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
