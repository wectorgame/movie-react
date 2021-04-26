import axios from "axios";
import {
  FETCH_FILMS_ERROR,
  FETCH_LOADING,
  FETCH_FILMS_SUCCESS,
  SEARCH_CLEAR,
  SEARCH_VALUE,
  ADD_TO_FAVORITE,
  CURR_MOVIE_DATA,
  FAVORITES_DATA,
} from "./actionTypes";

const api_key = "3530db6266571e46af24f0807947603a";

export function fetchFilms() {
  return async (dispatch) => {
    dispatch(fetchLoading());
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`
      );
      dispatch(fetchFilmsSuccess(response.data.results));
    } catch (e) {
      dispatch(fetchFilmsError(e));
    }
  };
}
export function fetchSearchFilms(value) {
  return async (dispatch) => {
    dispatch(searchClear());
    dispatch(fetchLoading());
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${value}`
      );
      dispatch(fetchFilmsSuccess(response.data.results));
    } catch (e) {
      dispatch(fetchFilmsError(e));
    }
  };
}
export function fetchMovie(id) {
  return async (dispatch) => {
    dispatch(fetchLoading());
    try {
      const response = await axios.get(`
      https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
      dispatch({ type: CURR_MOVIE_DATA, movieData: response.data });
    } catch (e) {
      dispatch(fetchFilmsError(e));
    }
  };
}
export function fetchMovies(movies = []) {
  return async (dispatch) => {
    dispatch(fetchLoading());
    try {
      const responses = await Promise.all(
        movies.map((id) =>
          axios.get(`
https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
        )
      );
      const data = responses.map((elem) => elem.data);
      dispatch({ type: FAVORITES_DATA, favoritesData: data });
    } catch (e) {
      dispatch(fetchFilmsError(e));
    }
  };
}
export function fetchFilmsByGenre(id) {
  return async (dispatch) => {
    dispatch(searchClear());
    dispatch(fetchLoading());
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${id}`
      );
      dispatch(fetchFilmsSuccess(response.data.results));
    } catch (e) {
      dispatch(fetchFilmsError(e));
    }
  };
}
export function fetchFilmsByDate(date) {
  return async (dispatch) => {
    dispatch(searchClear());
    dispatch(fetchLoading());
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_year=${date}`
      );
      dispatch(fetchFilmsSuccess(response.data.results));
    } catch (e) {
      dispatch(fetchFilmsError);
    }
  };
}
export function addFavorites(movie) {
  return { type: ADD_TO_FAVORITE, currentMovie: movie };
}
export function searchValue(value) {
  return { type: SEARCH_VALUE, value };
}
export function searchClear() {
  return {
    type: SEARCH_CLEAR,
  };
}
export function fetchLoading() {
  return {
    type: FETCH_LOADING,
  };
}
export function fetchFilmsSuccess(films) {
  return {
    type: FETCH_FILMS_SUCCESS,
    films,
  };
}
export function fetchFilmsError(e) {
  return {
    type: FETCH_FILMS_ERROR,
    error: e,
  };
}
