function postDetails(post) {

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
  
    return html}
  };



  module.exports = postDetails