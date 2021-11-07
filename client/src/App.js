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
import Toast from "./Components/Toast";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";

function App() {
  const [user, setUser] = useState(undefined);
  const [posts, setPosts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (showToast) {
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [showToast]);

  return (
    <div className="App h-100">
      <Loader loading={loading} />

      <div hidden={loading ? true : false}>
        <Router>
          <header>
            <Navbar user={user} setUser={setUser} />
          </header>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home posts={posts} user={user} title="Home | Blogify" />
              )}
            />

            <Route
              exact
              path="/login"
              render={() => <Login setUser={setUser} title="Login | Blogify" />}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <Signup setUser={setUser} title="Sign up | Blogify" />
              )}
            />

            <Route
              exact
              path="/dashboard"
              render={() => (
                <Dashboard
                  user={user}
                  posts={posts}
                  setPosts={setPosts}
                  setShowToast={setShowToast}
                  setToastText={setToastText}
                  title="Dashboard | Blogify"
                />
              )}
            />

            <Route
              exact
              path="/create"
              render={() => (
                <PostForm
                  user={user}
                  posts={posts}
                  setPosts={setPosts}
                  setShowToast={setShowToast}
                  setToastText={setToastText}
                />
              )}
            />

            {posts.map((post) => (
              <Route
                key={post._id}
                exact
                path={`/posts/${post._id}`}
                render={() => (
                  <Post
                    {...post}
                    user={user}
                    posts={posts}
                    setPosts={setPosts}
                    setShowToast={setShowToast}
                    setToastText={setToastText}
                  />
                )}
              ></Route>
            ))}
          </Switch>
        </Router>
      </div>

      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        toastText={toastText}
      />

      <Footer />
    </div>
  );
}

export default App;
