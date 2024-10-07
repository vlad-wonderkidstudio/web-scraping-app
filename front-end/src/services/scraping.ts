import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ScrapeResult } from '../interfaces/ScrapeResult.interface';
import { ApiEndpointResponse } from '../interfaces/ApiEndpointResponse.interface';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export const scrapingApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ['ScrapeResult'],
  endpoints: (build) => ({
    getResults: build.query<ScrapeResult[], void>({
      query: () => '/results',
      transformResponse: (response: ApiEndpointResponse, meta, arg): ScrapeResult[] =>
        (!response?.data || response.error || !isScrapeResults(response.data))
          ?  []
          : response.data,
      transformErrorResponse: (response, meta, arg) =>
        response?.data,
    }),
    scrape: build.mutation<ScrapeResult | null, string>({
      query: (url) => ({
        url: `/scrape`,
        method: 'POST',
        body: {
          url,
        },
      }),
      transformResponse: (response: ApiEndpointResponse, meta, arg): ScrapeResult | null =>
        (!response?.data || response.error || !isScrapeResult(response.data))
          ? null
          : response.data,
      transformErrorResponse: (response, meta, arg) =>
        response?.data,
    }),
  }),
})

const isScrapeResult = (data: unknown): data is ScrapeResult => {
  return !!(data as ScrapeResult)?._id;
}

const isScrapeResults = (data: unknown): data is ScrapeResult[] => {
  if (data === undefined || data === null) {
    return false;
  }
  return !!(
    Array.isArray(data) &&
    (data.length === 0 || (data[0] as ScrapeResult)._id)
  );
}

export const {
  useGetResultsQuery,
  useLazyGetResultsQuery,
  useScrapeMutation,
} = scrapingApi