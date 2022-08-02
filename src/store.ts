import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { leagueApi } from './components/common/api'

export const store = configureStore({
  reducer: {
    [leagueApi.reducerPath]: leagueApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(leagueApi.middleware),
})

setupListeners(store.dispatch)
