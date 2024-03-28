import React, { useState, useEffect } from "react";

function Home() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts") // Fetch all posts
      .then((res) => res.json())
      .then((data) => setAllPosts(data));
  }, []);

  const createPost = (title, content, username) => {
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, username }),
    }).then((res) => {
      if (res.ok) {
        fetch("http://localhost:5000/posts") // Re-fetch posts after creation
          .then((res) => res.json())
          .then((data) => setAllPosts(data));
      }
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      document.getElementById("username").value = "";
    });
  };

  return (
    <div className="App">
      <div className="createPostForm">
        {/* Create Post Form (XSS Vulnerability) */}
        <input type="text" id="title" placeholder="Title" />
        <input id="content" placeholder="Content" className="contentForm" />
        <input type="text" id="username" placeholder="Username" />
        <button
          onClick={() =>
            createPost(
              document.getElementById("title").value,
              document.getElementById("content").value,
              document.getElementById("username").value
            )
          }
        >
          Create Post
        </button>
      </div>
      <br />
      <div>
        <h3>XSS Vulnerability here!</h3>
        <p>Insert these texts into any or all the fields above:</p>
        <ul>
          <li>
            {"<"}img src=x onerror=alert(1){">"}
          </li>
          <li>
            {"<"}image src/onerror=prompt(8){">"}
          </li>
          <li>
            {"<"}audio src=1 href=1 onerror="javascript:alert(1)"{">"}
            {"<"}/audio{">"}
          </li>
          <li>
            {"<"}video src=1 href=1 onerror="javascript:alert(1)"{">"}
            {"<"}/video{">"}
          </li>
          <li>
            {"<"}form{">"}
            {"<"}button formaction="javascript:javascript:alert(1)"{">"}X
          </li>
        </ul>
        <p>
          Note: For the last XSS look for the post that has a button "X" and
          click on it
        </p>
      </div>

      {/* Display Posts (XSS Vulnerability) */}
      <div>
        {allPosts.map((post) => {
          return (
            <div key={post.id} className="post">
              <div
                className="title"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              <div
                className="body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div
                className="footer"
                dangerouslySetInnerHTML={{ __html: post.username }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
