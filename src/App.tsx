import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { useFetchRoutes } from './components/common/api';
import { NestedGrid } from './components/grid';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StandingsPage from './pages/standingsPage';
import { store } from './store';
import { League } from './types/league';

const App = () => {
    const { data: leagues, error, isLoading } = useFetchRoutes();
    return (
        <StrictMode>
            <Provider store={store}>
                <div className="App">
                    <Navbar />
                    <Router>
                        {(leagues === undefined || isLoading) && <div className="loading">loading...</div>}
                        {error && <p>{error}</p>}
                        {leagues && (
                            <div className="content">
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    {leagues.data.map((league: League) => (
                                        <Route path={`/${league.id[0] + league.id[1] + league.id[2]}/:id`}>
                                            <StandingsPage leagueName={league.id[0] + league.id[1] + league.id[2]}/>
                                        </Route>))}
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
