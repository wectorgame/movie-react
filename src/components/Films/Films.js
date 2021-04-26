import { Component } from "react";
import { connect } from "react-redux";
import "./Films.scss";
import {
  fetchFilms,
  fetchFilmsByDate,
  fetchFilmsByGenre,
  fetchSearchFilms,
  searchValue,
} from "../../store/actions/films";
import { FilmCard } from "../FilmCard/FilmCard";
import Loader from "../UI/Loader/Loader";
import { Button } from "@material-ui/core";
import Select from "../UI/Select/Select";

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
  dateSelectHandler = (event) => {
    console.log(this.props);
    this.props.fetchFilmsByDate(event.target.value);
  };
  selectChangeHandler = (event) => {
    console.log(this.props);
    this.props.fetchFilmsByGenre(event.target.value);
  };

  render() {
    const options = (
      <>
        <option defaultValue>Any Year</option>
        <Select></Select>
      </>
    );

    return (
      <>
        <div className="row justify-content-between mt-5">
          <div>
            <select
              className="form-select form-select-lg mb-3 mr-5 genre-select"
              aria-label=".form-select-lg example"
              value={""}
              onChange={this.selectChangeHandler}
            >
              <option defaultValue>Any genre</option>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="27">Horror</option>
            </select>
            <select
              className="form-select form-select-lg mb-3 genre-select"
              aria-label=".form-select-lg example"
              value={""}
              onChange={this.dateSelectHandler}
            >
              {options}
            </select>
          </div>
          <Button color="primary" onClick={this.sortByDate}>
            Сортировать по популярности
          </Button>
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
    fetchFilmsByGenre: (id) => dispatch(fetchFilmsByGenre(id)),
    fetchFilmsByDate: (date) => dispatch(fetchFilmsByDate(date)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Films);
