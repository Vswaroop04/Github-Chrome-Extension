import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home";
import PrivacyPolicy from "./Components/PrivacyPolicy";

function App() {
  return (
    <Router>
        <Route path="/" component={Home} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
    </Router>
  );
}

export default App;
