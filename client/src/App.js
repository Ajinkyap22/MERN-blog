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
          <Route exact path="/" render={() => <Home posts={posts} />} />

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
              render={() => <Post {...post} user={user} />}
            ></Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// home - all blogs
// signup login
// profile with user posts - published and unpublished
// create post option
// on post - edit, delete, unpublish option
// comment option

// navbar - logo, home, login, signup,
// if logged in - logo, home, create, dashboard
