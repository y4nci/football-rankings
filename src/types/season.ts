type Season = {
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

export type { Season };
