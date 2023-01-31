import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Home } from "./pages/Home/Home";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
