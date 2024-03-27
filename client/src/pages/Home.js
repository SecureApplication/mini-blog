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
    });
  };

  return (
    <div className="App">
      <div className="createPostForm">
        {/* Create Post Form (XSS Vulnerability) */}
        <input type="text" id="title" placeholder="Title" />
        <input
          id="content"
          placeholder="Content"
          className="contentForm"
        ></input>
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

      {/* Display Posts (XSS Vulnerability) */}
      <div>
        {allPosts.map((post) => {
          return (
            <div key={post.id} className="post">
              <div className="title">{post.title}</div>
              <div className="body">{post.content}</div>
              <div className="footer">{post.username}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
