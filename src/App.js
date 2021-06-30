import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from "./pages/admin";
import Composition from "./pages/Atelier/composition";
import Gamme from "./pages/Atelier/gamme";
import HistoriqueRealisation from "./pages/Atelier/historiqueRealisation";
import Machine from "./pages/Atelier/machine";
import Operation from "./pages/Atelier/operation";
import Piece from "./pages/Atelier/piece";
import Qualification from "./pages/Atelier/qualification";
import Realisation from "./pages/Atelier/realisation";
import ShowHistoriqueRealisation from "./pages/Atelier/showHistoriqueRealisation";
import ShowPiece from "./pages/Atelier/showPiece";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route component={Composition} path="/atelier/composition/:id_piece"/>
        <Route component={ShowHistoriqueRealisation} path="/atelier/realisation/historique/:id_realisation"/>
        <Route component={HistoriqueRealisation} path="/atelier/realisation/historique"/>
        <Route component={Realisation} path="/atelier/realisation"/>
        <Route component={Operation} path="/atelier/operation"/>
        <Route component={Gamme} path="/atelier/gamme/:id_gamme"/>
        <Route component={ShowPiece} path="/atelier/piece/:id_piece"/>
        <Route component={Piece} path="/atelier/piece"/>
        <Route component={Machine} path="/atelier/fabrication/machine"/>
        <Route component={Qualification} path="/atelier/fabrication/qualification"/>
        <Route component={Admin} path="/admin"/>
        <Route component={Home} path="/"/>
      </Switch>
    </Router>
    
  );
}

export default App;
