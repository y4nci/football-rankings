declare type LeagueLogo = {
    href: string,
    width: number,
    height: number,
    alt: string,
    rel: any[],
    lastUpdated: string,
};

declare type League = {
    id: string,
    alternateId: string,
    name: string,
    abbreviation: string,
    shortName: string,
    midsizeName: string,
    slug: string,
    season: {
        type: {
            id: string,
            hasStandings: boolean,
        }
    }
    links: any[],
    logos: [LeagueLogo, LeagueLogo],
    hasStandings: boolean,
};

declare type LeagueQuery = {
    leagues: League[],
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
    children: any[];
    seasons: Season[],
};

declare type Standings = {
    uid: string,
    id: number,
    name: string,
    abbreviation: string,
    children: {
        uid: string,
        id: string,
        name: string,
        abbreviation: string,
        standings: {
            id: string,
            name: string,
            displayName: string,
            links: any[],
            season: number,
            seasonType: number,
            entries: Team[],
        }

        seasonDisplay: string,
        season: string,
    }[],
    seasons: Season[],
};

declare type Stat = {
    name: string,
    displayName: string,
    shortDisplayName: string,
    description: string,
    abbreviation: string,
    type: string,
    value?: number,
    displayValue: string,
    id?: string,
    summary?: string,
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
            rel: any[],
            lastUpdated: string
        }],
        links: any[],
        isNational: false,
    },
    note?: {
        color: string,
        description: string,
        rank: number
    },
    stats: Stat[]
};
