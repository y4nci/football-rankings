import { Team } from './team';


type Standings = {
    id: number,
    data: {
        name: string,
        abbreviation: string,
        seasonDisplay: string,
        season: string,
        standings: Team[],
    }
};

export type { Standings };
