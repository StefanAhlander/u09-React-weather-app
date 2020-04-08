import React from 'react';
import PageNav from './PageNav';
import { WeatherProvider } from './contexts/weather.context';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Forecast from './Forecast';

function App() {
  return (
    <div className='App'>
      <WeatherProvider>
        <BrowserRouter>
          <PageNav />
          <Switch>
            <Route exact path='/current' component={Home} />
            <Route exact path='/forecast' component={Forecast} />
            <Redirect to='/current' />
          </Switch>
        </BrowserRouter>
      </WeatherProvider>
    </div>
  );
}

export default App;
