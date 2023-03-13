export const isLeagueValid = (league: League) => {
    return league && league.hasStandings; // && league.season.type.hasStandings;
};

export const isStandingsValid = (standings: Standings) => {
    return standings && standings.children.length > 0; // && standings.children[0].standings.entries;
};
