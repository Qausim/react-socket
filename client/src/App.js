import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Error404 from './components/Erro404';
import Join from './components/Join';
import Login from './components/Login';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Join} />
        <Route exact path='/chat' component={Chat} />
        <Route exact path='/login' component={Login} />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
