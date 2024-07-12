import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import PrivacyPolicy from "./Components/PrivacyPolicy";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
      </Switch>
    </Router>
  );
}

export default App;
