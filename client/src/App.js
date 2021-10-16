import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Post from "./Components/Post";
import Home from "./Components/Home";
import PostForm from "./Components/PostForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(undefined);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="App h-100">
      <Router>
        <header>
          <Navbar user={user} setUser={setUser} />
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home posts={posts} user={user} />}
          />

          <Route
            exact
            path="/login"
            render={() => <Login setUser={setUser} />}
          />
          <Route exact path="/signup" component={Signup} />

          <Route
            exact
            path="/dashboard"
            render={() => (
              <Dashboard user={user} posts={posts} setPosts={setPosts} />
            )}
          />

          <Route
            exact
            path="/create"
            render={() => (
              <PostForm user={user} posts={posts} setPosts={setPosts} />
            )}
          />

          {posts.map((post) => (
            <Route
              key={post._id}
              exact
              path={`/posts/${post._id}`}
              render={() => (
                <Post {...post} user={user} posts={posts} setPosts={setPosts} />
              )}
            ></Route>
          ))}
        </Switch>
      </Router>

      <footer className="position-fixed end-0 bottom-0 m-4 bg-white rounded-circle">
        <a
          className="text-dark text-decoration-none"
          href="https://github.com/Ajinkyap22/MERN-blog"
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-github github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </footer>
    </div>
  );
}

export default App;
