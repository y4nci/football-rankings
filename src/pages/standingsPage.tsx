import React from "react";
import {Link, useParams} from "react-router-dom";
import {useGetLeagueByNameAndSeasonQuery} from "../components/common/api";
import {CustomizedTables} from "../components/common/table";

const StandingsPage = (props:{leagueName:string}) => {
  const leagueName = props.leagueName;
  const { id } = useParams<{ id: string }>();
  const {data: league, error, isLoading} = useGetLeagueByNameAndSeasonQuery(`${leagueName}.1/standings?season=${id}`);

  console.log(league);

  return (
    <div className="standings-page" >
      <p>{error && {error}}</p>
      {(league===undefined || isLoading) && <div className="loading">loading...</div>}

      <h2 className="league-name" >{league && league.data.name}</h2>

      <div className="season-names">
        {league && id === "2006" && <p className="invalid-season">{`${Number(id) - 1} - ${id}`}</p>}
        {league && id !== "2006" && <Link className="season-navigator" to={`/${leagueName}/${Number(id) - 1}`} style={{ textDecoration: 'none'}}>{`${Number(id) - 1} - ${id}`}</Link>}
        <h3 className="season-name">{league && `${id} - ${Number(id) + 1}`}</h3>
        {league && id !== "2022" && <Link className="season-navigator" to={`/${leagueName}/${Number(id) + 1}`} style={{ textDecoration: 'none'}}>{`${Number(id) + 1} - ${Number(id) + 2}`}</Link>}
        {league && id === "2022" && <p className="invalid-season">{`${Number(id) + 1} - ${Number(id) + 2}`}</p>}
      </div>



      <div>{league && !isLoading && CustomizedTables(league.data.standings)}</div>
    </div>
  );
}


export default StandingsPage;


