import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => {
          return <Redirect to={'/auth'} />
        }} />
        <Route path="/auth" component={Auth} />
        <Route path="/message" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
