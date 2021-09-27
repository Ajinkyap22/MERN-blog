import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <Router>
          <Navbar />
        </Router>
      </header>
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
