import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LeagueGrid } from './pages/components/LeagueGrid';
import Navbar from './pages/components/Navbar';
import Home from './pages/Home';
import Standings from './pages/Standings';
import { useFetchRoutes } from './redux/api';
import { store } from './store';

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
                        {leagues
                            && (<div className="content">
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    {leagues.data.map((league: League, index) => (
                                        <Route path={`/${league.id[0] + league.id[1] + league.id[2]}/:id`} key={index}>
                                            <Standings leagueName={league.id[0] + league.id[1] + league.id[2]}/>
                                        </Route>))}
                                </Switch>
                            </div>
                            )}
                    </Router>
                    <div className="league-grid">{leagues && <LeagueGrid leagues={leagues.data}/>}</div>
                </div>
            </Provider>
        </StrictMode>
    );
};

export default App;
