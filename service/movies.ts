import { Movie, Movies } from "@/types";
import fetch from ".";

export const getDiscoverMovie = () => fetch.get<Movies>("/3/discover/movie", {
  params: {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc"
  }
}).then(res => res.data);

export const getTrending = () => fetch.get<Movies>("/3/trending/movie/day", {
  params: {
    language: "en-US",
  }
}).then(res => res.data);

export const getTopRated = () => fetch.get<Movies>("/3/movie/top_rated", {
  params: {
    language: "en-US",
  }
}).then(res => res.data);

export const getMovieDetail = (id: string) => fetch.get<Movie>(`/3/movie/${id}`, {
  params: {
    language: "en-US",
  }
}).then(res => res.data);

export const getSimilarMovie = (id: string) => fetch.get<Movies>(`/3/movie/${id}/similar`, {
  params: {
    language: "en-US",
    page: 1
  }
}).then(res => res.data);

export const addToWatchlist = (id: number, act: boolean) => fetch.post("/3/account/20924841/watchlist", {
  media_type: "movie",
  media_id: id,
  watchlist: act
});

export const getWatchlist = () => fetch.get<Movies>("/3/account/20924841/watchlist/movies", {
  params: {
    language: "en-US",
    page: 1,
    sort_by: "created_at.asc"
  }
}).then(res => res.data);
