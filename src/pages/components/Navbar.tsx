import React from 'react';
import { Link } from 'react-router-dom';

import { getCurrentSeason } from '../../utils/datetime';

const Navbar = () => {
    const currentSeason = getCurrentSeason();

    return (
        <nav className="navbar">
            <h1>
                <Link to="/" style={{ textDecoration: 'none', color: '#0cc2bc' }}>MAÇKOLİK</Link>
            </h1>
            <div className="links">
                {/*https://a.espncdn.com/i/leaguelogos/soccer/500-dark/11.png*/}
                <Link to={`/eng/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/23.png" alt="img" /></Link>
                <Link to={`/ned/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/11.png" alt="img" /></Link>
                <Link to={`/fra/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/9.png" alt="img" /></Link>
                <Link to={`/ger/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/10.png" alt="img" /></Link>
                <Link to={`/ita/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/12.png" alt="img" /></Link>
            </div>
        </nav>
    );
};

export default Navbar;
