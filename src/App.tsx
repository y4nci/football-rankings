import React, {StrictMode} from 'react';
import Navbar from "./components/Navbar";
import {store} from "./store";
import {Provider} from "react-redux";
import Home from "./pages/Home";
import {League} from "./types/league";
import StandingsPage from "./pages/standingsPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useFetchRoutes} from "./components/common/api";
import {NestedGrid} from "./components/grid";

const App = () => {
  const {data: leagues, error, isLoading} = useFetchRoutes();
  return (
    <StrictMode>
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Router>
            {(leagues===undefined || isLoading) && <div className="loading">loading...</div>}
            {error && <p>{error}</p>}
            {leagues && (
              <div className="content">
                <Switch>
                  <Route exact path="/" component={Home} />
                  {leagues.data.map((league: League) => (
                    <Route path={`/${league.id[0] + league.id[1] + league.id[2]}/:id`}>
                      <StandingsPage leagueName={league.id[0] + league.id[1] + league.id[2]}/>
                    </Route>)
                  )}
                </Switch>
              </div>
            )}
          </Router>
          <div className="league-grid">{leagues && (NestedGrid(leagues.data))}</div>
        </div>
      </Provider>
    </StrictMode>
  );
};

export default App;
