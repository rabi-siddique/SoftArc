import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import {Login} from './components'
import {SignUp} from './components'
import {Dashboard} from './pages'
import {ResetPassword} from './pages'
import {ResetPasswordConfirm} from './pages'
import {Activate} from './pages'
import {Provider} from 'react-redux'
import store from './store'


function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Switch>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dash' component={Dashboard} />
        <Route exact path='/reset-password' component={ResetPassword} />
        <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
        <Route exact path='/activate/:uid/:token' component={Activate} />
      </Switch>
      </div>
    </Router>
    </Provider>
   
  );
}

export default App;
