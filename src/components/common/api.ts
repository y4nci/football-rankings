import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Standings} from '../../types/standings'
import {LeagueData} from "../../types/leagueData";

type LeagueDataQuery = {
  status: boolean,
  data: [LeagueData]
}

export const leagueApi = createApi({
  reducerPath: 'leagueApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-football-standings.azharimm.site/leagues/' }),
  endpoints: (builder) => ({
    getLeagueByNameAndSeason: builder.query<Standings, string>({
      query: (endpoint) => endpoint,
    }),
    getAvailableLeagues: builder.query<LeagueDataQuery, string>({
      query: () => "",
    })
  }),
})

export const { useGetLeagueByNameAndSeasonQuery, useGetAvailableLeaguesQuery } = leagueApi
