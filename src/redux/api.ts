import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useEffect, useState } from 'react';

const useFetchRoutes = () => {
    const url = 'https://api-football-standings.azharimm.site/leagues/';
    const [league, setLeague]: [LeagueQuery | undefined, (obj:LeagueQuery)=>void] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal }).then((res) => {
            if (!res.ok)
                throw Error('error');

            return res.json();
        }).then((data) => {
            setIsLoading(false);
            setError(null);
            setLeague(data);
        }).catch((err) => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted');
                return;
            } else {
                // auto catches network / connection error
                console.log(err);
                setError(err.message);
                setIsLoading(false);
            }
        });

        return () => abortCont.abort();
    }, [url]);

    return { data: league, error, isLoading };
};


export const leagueApi = createApi({
    reducerPath: 'leagueApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api-football-standings.azharimm.site/leagues/' }),
    endpoints: builder => ({
        getLeagueByNameAndSeason: builder.query<Standings, string>({
            query: endpoint => endpoint,
        }),
        getAvailableSeasons: builder.query<SeasonQuery, string>({
            query: endpoint => endpoint,
        }),
    }),
});

export const { useGetLeagueByNameAndSeasonQuery, useGetAvailableSeasonsQuery } = leagueApi;
export { useFetchRoutes };
