import React from 'react';
import { Link } from 'react-router-dom';

import { getCurrentSeason } from '../../utils/datetime';

const Header = () => {
    const currentSeason = getCurrentSeason();

    return (
        <nav className="navbar">
            <h1>
                <Link to="/football-rankings/" style={{ textDecoration: 'none', color: '#00504d', fontWeight: 900 }}>
                    football rankings
                </Link>
            </h1>
            <div className="links">
                {/*https://a.espncdn.com/i/leaguelogos/soccer/500-dark/11.png*/}
                <Link to={`/football-rankings/uefa.champions/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/2.png" alt="img" /></Link>
                <Link to={`/football-rankings/uefa.europa/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/2310.png" alt="img" /></Link>
                <Link to={`/football-rankings/uefa.europa.conf/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/20296.png" alt="img" /></Link>
                <hr style={{ marginRight: '32px', marginLeft: '16px', height: '64px' }}/>
                <h3
                    style={{ color: '#333', fontWeight: 'normal', cursor: 'pointer' }}
                    onClick={() => {
                        const allLeaguesElem = document.getElementById('league-grid');

                        if (allLeaguesElem) {
                            allLeaguesElem.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            window.location.href = '/football-rankings';
                            document.getElementById('league-grid')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    All Leagues
                </h3>
            </div>
        </nav>
    );
};

export default Header;
