import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App h-100">
      <Router>
        <header>
          <Navbar />
        </header>
        <Switch>
          {/* <Route exact path="/" component={Home}/> */}
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/signup" component={Signup}/> */}
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
