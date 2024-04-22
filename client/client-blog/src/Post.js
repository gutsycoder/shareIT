export default function Post() {
    return (
      <>
        <div className="post">
          <div className="image">
            <img src="https://cdn.vectorstock.com/i/1000x1000/79/80/blue-background-with-desktop-computer-and-link-vector-15127980.webp" alt="Computer and link" />
          </div>
          <div className="texts">
            <h2>First Blog</h2>
            <p className="info">
              <span className="author">Suyash</span>
              <time>2024-04-22 13:32</time>
            </p>
            <p className="summary">This is the paragraph for the given blog</p>
          </div>
        </div>
      </>
    );
  }
  