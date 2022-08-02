import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <nav className="navbar">
        <h1>
          <Link to="/" style={{ textDecoration: 'none', color: "#0cc2bc" }}>MAÇKOLİK</Link>
        </h1>
        <div className="links">
          {/*https://a.espncdn.com/i/leaguelogos/soccer/500-dark/11.png*/}
          <Link to="/eng/2022"><img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/23.png" alt="img" /></Link>
          <Link to="/ned/2022"><img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/11.png" alt="img" /></Link>
          <Link to="/fra/2022"><img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/9.png" alt="img" /></Link>
          <Link to="/ger/2022"><img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/10.png" alt="img" /></Link>
          <Link to="/ita/2022"><img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/12.png" alt="img" /></Link>
        </div>
      </nav>
  );
};

export default Navbar;
