import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from "./pages/admin";
import Machine from "./pages/Atelier/machine";
import Qualification from "./pages/Atelier/qualification";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route component={Machine} path="/atelier/fabrication/machine"/>
        <Route component={Qualification} path="/atelier/fabrication/qualification"/>
        <Route component={Admin} path="/admin"/>
        <Route component={Home} path="/"/>
      </Switch>
    </Router>
    
  );
}

export default App;
