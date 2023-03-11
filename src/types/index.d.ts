declare type League = {
    id: string,
    name: string,
    slug: string,
    abbr: string,
    logos: {
        light: string,
        dark: string,
    }
};

declare type LeagueQuery = {
    status: boolean,
    data: [League]
};

declare type Season = {
    /*
  {"year":2004,"startDate":"2004-08-01T04:00Z",
        "endDate":"2005-08-01T03:59Z",
        "displayName":"2004-05 Barclays Premier League",
        "types":[{"id":"1",
          "name":"2004-2005 Barclays Premier League",
          "abbreviation":"2004-05",
          "startDate":"2004-08-01T04:00Z",
          "endDate":"2005-08-01T03:59Z",
          "hasStandings":true}]}
   */

    year: number;
    startDate: string;
    endDate: string;
    displayName: string;
    types: [
        {
            id: string;
            name: string;
            abbreviation: string;
            startDate: string;
            endDate: string;
            hasStandings: boolean;
        },
    ]
};

declare type SeasonQuery = {
    status: boolean;
    data: {
        name: string,
        desc: string,
        abbreviation: string,
        seasons: [Season]
    }
};

declare type Standings = {
    id: number,
    data: {
        name: string,
        abbreviation: string,
        seasonDisplay: string,
        season: string,
        standings: Team[],
    }
};

declare type Stat = {
    name: string,
    displayName: string,
    shortDisplayName: string,
    description: string,
    abbreviation: string,
    type: string,
    value: number,
    displayValue: string
};


declare type Team = {
    team: {
        id: string,
        uid: string,
        location: string,
        name: string,
        abbreviation: string,
        displayName: string,
        shortDisplayName: string,
        isActive: boolean,
        logos: [{
            href: string,
            width: number,
            height: number,
            alt: string,
            rel: string[],
            lastUpdated: string
        }],
    },
    note?: {
        color: string,
        description: string,
        rank: number
    },
    stats: [
        Stat,
        Stat,
        Stat,
        Stat,
        Stat,
        Stat,
        Stat,
        Stat,
        Stat,
        Stat,
        Stat,
        Stat,
        {
            id: string,
            name: string,
            abbreviation: string,
            displayName: string,
            shortDisplayName: string,
            description: string,
            type: string,
            summary: string,
            displayValue: string,
        },
    ]
};
