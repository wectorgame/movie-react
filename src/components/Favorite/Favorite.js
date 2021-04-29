import { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../../store/actions/films";
import { FilmCard } from "../FilmCard/FilmCard";
import SeriesCard from "../SeriesCard/SeriesCard";
import Loader from "../UI/Loader/Loader";

class Favorite extends Component {
  async componentDidMount() {
    this.props.fetchMovies(this.props.favorites);
  }

  render() {
    return (
      <div >
        <div className="row">
          {this.props.loading && this.props.favorites.length !== 0 ? (
            <Loader></Loader>
          ) : (
            <>
              {this.props.favoritesDataFilms.map((film) => {
                return (
                  <div className="col-sm-3 mb-4" key={film.id}>
                    <FilmCard film={film}></FilmCard>
                  </div>
                );
              })}
              ,
              {this.props.favoritesDataTvSeries.map((series) => {
                return (
                  <div className="col-sm-3 mb-4" key={series.id}>
                    <SeriesCard series={series}></SeriesCard>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.film);
  return {
    favorites: state.film.favorites,
    favoritesDataTvSeries: state.film.favoritesDataTvSeries,
    favoritesDataFilms: state.film.favoritesDataFilms,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchMovies: (moviesId) => dispatch(fetchMovies(moviesId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
