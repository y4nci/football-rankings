import { Season } from './season';

type SeasonQuery = {
    status: boolean;
    data: {
        name: string,
        desc: string,
        abbreviation: string,
        seasons: [Season]
    }
};

export type { SeasonQuery };
