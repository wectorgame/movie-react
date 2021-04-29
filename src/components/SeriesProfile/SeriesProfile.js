import { Component } from "react";
import { connect } from "react-redux";
import { addFavorites, fetchMovie } from "../../store/actions/films";
import error from "../../images/error.png";
import { Button } from "@material-ui/core";
class SeriesProfile extends Component {
  async componentDidMount() {
    this.props.fetchMovie(this.props.match.params.name);
  }
  favoriteHandler = () => {
    this.props.addFavorites(this.props.id);
  };
  render() {
    return (
      <div className="p-5 mb-4 bg-light rounded-3 Film">
        <h1>hello</h1>
        <div className="container-fluid py-5">
          <img
            src={
              this.props.data.poster_path
                ? `https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`
                : `${error}`
            }
            alt={`${this.props.data.title}`}
            className="float-left  movie-image mr-4"
          ></img>
          <h1 className="display-5 fw-bold">{this.props.data.title}</h1>
          <h5 className="col-md-8 fs-4">
            Date release: {this.props.data.first_air_date}
          </h5>
          <p className="col-md-8 fs-4">{this.props.data.overview}</p>

          <a style={{ textDecoration: "none" }} href={this.props.data.homepage}>
            Страница фильма
          </a>
          <hr></hr>
          {this.props.favorites
            .map((elem) => elem.movie)
            .includes(this.props.id) ? (
            <Button disabled>Этот фильм в вашем избранном</Button>
          ) : (
            <Button onClick={this.favoriteHandler}>Добавить в избранное</Button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.film.currentMovieData,
    id: state.film.currentMovieData.id,
    favorites: state.film.favorites,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchMovie: (id) => dispatch(fetchMovie(id, true)),
    addFavorites: (movie) => dispatch(addFavorites(movie, true)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SeriesProfile);
