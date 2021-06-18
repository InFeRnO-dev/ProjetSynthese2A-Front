import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from "./pages/admin";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route component={Admin} path="/admin"/>
        <Route component={Home} path="/"/>
      </Switch>
    </Router>
    
  );
}

export default App;
