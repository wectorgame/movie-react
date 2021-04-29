import {
  ADD_TO_FAVORITE,
  CURR_MOVIE_DATA,
  FAVORITES_DATA,
  FETCH_FILMS_ERROR,
  FETCH_FILMS_SUCCESS,
  FETCH_LOADING,
  FETCH_SERIES_SUCCESS,
  FILTERED_SERIES,
  SEARCH_CLEAR,
  SEARCH_VALUE,
} from "../actions/actionTypes";

const InitialState = {
  films: [],
  series: [],
  error: null,
  film: null,
  loading: false,
  search: {
    value: "",
    type: "text",
  },

  favorites: [],
  favoritesDataTvSeries: [],
  favoritesDataFilms: [],
  currentMovieData: {},
  filteredSeries: [],

  currentSeries: [],
};

export default function filmReducer(state = InitialState, action) {
  switch (action.type) {
    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FILMS_SUCCESS:
      return {
        ...state,
        loading: false,
        films: action.films,
      };
    case FETCH_SERIES_SUCCESS:
      return {
        ...state,
        loading: false,
        series: action.series,
      };
    case FETCH_FILMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FILTERED_SERIES:
      return {
        ...state,
        loading: false,
        filteredSeries: action.filteredSeries,
        tvSeries: action.tvSeries,
      };

    case SEARCH_CLEAR:
      return {
        ...state,
        films: [],
        loading: false,
      };
    case SEARCH_VALUE:
      return {
        ...state,
        search: {
          value: action.value,
          type: "text",
        },
        loading: false,
      };
    case ADD_TO_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.currentMovie],
      };
    case CURR_MOVIE_DATA:
      return {
        ...state,
        currentMovieData: action.movieData,
      };
    case FAVORITES_DATA:
      return {
        ...state,
        favoritesDataTvSeries: action.favoritesDataTvSeries,
        favoritesDataFilms: action.favoritesDataFilms,
      };
    default:
      return state;
  }
}
