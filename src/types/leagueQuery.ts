import { League } from './league';

type LeagueQuery = {
    status: boolean,
    data: [League]
};

export type { LeagueQuery };