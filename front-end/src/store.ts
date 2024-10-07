import { configureStore } from '@reduxjs/toolkit'
import { scrapingApi } from './services/scraping'

export const store = configureStore({
  reducer: {
    [scrapingApi.reducerPath]: scrapingApi.reducer,
  },
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(scrapingApi.middleware),
})