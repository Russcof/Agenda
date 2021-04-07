import PageAccueil from './PageAccueil';
import PageInscription from './PageInscription';
import ResetPassword from './Pagemdpo';
import Dashboard from './Dashboard/Dashboard';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {

  return (
    <Router>
      <Route path="/" exact component={PageAccueil}/>
      <Route path="/Inscription" exact component={PageInscription}/>
      <Route path="/Mot_de_passe_oublié" exact component={ResetPassword}/>
      <Route path="/Dashboard" exact component={Dashboard}/>
    </Router>
  );
}

export default App;
