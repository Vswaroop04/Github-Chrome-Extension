import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home";
import PrivacyPolicy from "./Components/PrivacyPolicy";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/privacy-policy">
        <PrivacyPolicy />
      </Route>
    </Router>
  );
}

export default App;
