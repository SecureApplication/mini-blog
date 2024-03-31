import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    //Check if user is logged in
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      fetch("http://localhost:5000/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => setAllPosts(data));
    }
  }, []);

  const createPost = () => {
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        title: title,
        content: content,
        username: username,
      }),
    }).then((res) => {
      if (res.ok) {
        fetch("http://localhost:5000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        })
          .then((res) => res.json())
          .then((data) => setAllPosts(data));
      }
      setTitle("");
      setContent("");
      setUsername("");
    });
  };

  return (
    <div className="App">
      <h1>Home</h1>
      <br />
      <div className="createPostForm">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          className="contentForm"
          placeholder="Content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button onClick={() => createPost()}>Create Post</button>
      </div>

      {/* Display Posts (PlainText) */}
      <div>
        {allPosts.map((post) => {
          return (
            <div key={post.id} className="post">
              <div className="title"> {post.title} </div>
              <div className="body"> {post.content} </div>
              <div className="footer"> {post.username} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
