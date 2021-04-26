import { Component } from "react";
import { connect } from "react-redux";
import {
  fetchFilms,
  fetchSearchFilms,
  searchValue,
} from "../../store/actions/films";
import { FilmCard } from "../FilmCard/FilmCard";
import Loader from "../UI/Loader/Loader";

class Films extends Component {
  async componentDidMount() {
    this.props.fetchFilms();
  }
  submitHandler(event) {
    if (event.key !== "Enter") {
      return;
    }
    const value = this.props.search.value;

    if (value.trim()) {
      this.props.fetchSearchFilms(value);
    } else {
      if (this.props.films.length === 0) this.props.fetchFilms();
    }
  }
  onChangeHandler(event) {
    this.props.searchValue(event.target.value);
  }
  render() {
    return (
      <>
        <h1>Фильмы</h1>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Поиск..."
            type="text"
            value={this.props.value}
            onChange={(event) => this.onChangeHandler(event)}
            onKeyPress={(event) => this.submitHandler(event)}
          ></input>
        </div>

        <div className="row">
          {this.props.loading && this.props.films.length !== 0 ? (
            <Loader></Loader>
          ) : (
            this.props.films.map((film) => {
              return (
                <div className="col-sm-4 mb-4" key={film.id}>
                  <FilmCard film={film}></FilmCard>
                </div>
              );
            })
          )}
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    films: state.film.films,
    loading: state.film.loading,
    search: state.film.search,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchFilms: () => dispatch(fetchFilms()),
    fetchSearchFilms: (value) => dispatch(fetchSearchFilms(value)),
    searchValue: (value) => dispatch(searchValue(value)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Films);