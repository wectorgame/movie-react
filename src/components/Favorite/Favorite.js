import { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../../store/actions/films";
import { FilmCard } from "../FilmCard/FilmCard";
import Loader from "../UI/Loader/Loader";

class Favorite extends Component {
  async componentDidMount() {
    this.props.fetchMovies(this.props.favorites);
  }

  render() {
    return (
      <div>
        <h1>Favorites</h1>
        <div className="row">
          {this.props.loading && this.props.films.favorites !== 0 ? (
            <Loader></Loader>
          ) : (
            this.props.favoritesData.map((film) => {
              return (
                <div className="col-sm-4 mb-4" key={film.id}>
                  <FilmCard film={film}></FilmCard>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    favorites: state.film.favorites,
    favoritesData: state.film.favoritesData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchMovies: (moviesId) => dispatch(fetchMovies(moviesId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
