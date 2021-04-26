import {
  ADD_TO_FAVORITE,
  CURR_MOVIE_DATA,
  FAVORITES_DATA,
  FETCH_FILMS_ERROR,
  FETCH_FILMS_SUCCESS,
  FETCH_LOADING,
  SEARCH_CLEAR,
  SEARCH_VALUE,
} from "../actions/actionTypes";

const InitialState = {
  films: [],
  error: null,
  film: null,
  loading: false,
  search: {
    value: "",
    type: "text",
  },
  favorites: [],
  favoritesData: [],
  currentMovieData: {},
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
    case FETCH_FILMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
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
        favoritesData: action.favoritesData,
      };
    default:
      return state;
  }
}
