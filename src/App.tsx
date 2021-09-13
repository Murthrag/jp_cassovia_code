import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Navigation from './components/Navigation';
import Locations from './views/Locations';
import background from "./assets/bck-image.jpg";

function App() {
  return (
    <div className="App" >
      <div className="bckImage" style={{ backgroundImage: `url(${background})` }}></div>
      <header className="App-header">
        <Navigation />
      </header>

      <main className="content">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/locations" component={Locations} />
        </Switch>
      </main>

    </div >
  );
}

export default App;
