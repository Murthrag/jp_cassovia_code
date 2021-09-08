import React from 'react';

import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Navigation from './components/Navigation';
import Locations from './views/Locations';

function App() {
  return (
    <div className="App">
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
