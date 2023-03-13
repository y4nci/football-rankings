import React from 'react';
import { Link } from 'react-router-dom';

import { getCurrentSeason } from '../../utils/datetime';

const Header = () => {
    const currentSeason = getCurrentSeason();

    return (
        <nav className="navbar">
            <h1>
                <Link to="/mackolik/" style={{ textDecoration: 'none', color: '#0cc2bc' }}>MAÇKOLİK</Link>
            </h1>
            <div className="links">
                {/*https://a.espncdn.com/i/leaguelogos/soccer/500-dark/11.png*/}
                <Link to={`/mackolik/eng.1/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/23.png" alt="img" /></Link>
                <Link to={`/mackolik/ned.1/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/11.png" alt="img" /></Link>
                <Link to={`/mackolik/fra.1/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/9.png" alt="img" /></Link>
                <Link to={`/mackolik/ger.1/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/10.png" alt="img" /></Link>
                <Link to={`/mackolik/ita.1/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/12.png" alt="img" /></Link>
            </div>
        </nav>
    );
};

export default Header;
