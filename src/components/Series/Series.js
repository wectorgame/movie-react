import { Component } from "react";
import { connect } from "react-redux";
import {
  fetchFilms,
  fetchFilmsByGenre,
  fetchSearchFilms,
  fetchSeriesByDate,
  searchValue,
} from "../../store/actions/films";
import { FilmCard } from "../FilmCard/FilmCard";
import Loader from "../UI/Loader/Loader";
import Select from "../UI/Select/Select";

class Series extends Component {
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
      if (this.props.tvSeries.length === 0) this.props.fetchFilms();
    }
  }
  onChangeHandler(event) {
    this.props.searchValue(event.target.value);
  }
  dateSelectHandler = (event) => {
    this.props.fetchSeriesByDate(event.target.value, this.props.tvSeries);
  };
  selectChangeHandler = (event) => {
    console.log(event.target.value);
    this.props.fetchFilmsByGenre(event.target.value);
  };

  render() {
    const options = (
      <>
        <option defaultValue> Any Year</option>
        <Select></Select>
      </>
    );
    let currentSeries;
    if (this.props.filteredSeries[0] === "Not Found") {
      currentSeries = [];
    } else if (this.props.filteredSeries.length) {
      currentSeries = this.props.filteredSeries;
    } else {
      currentSeries = this.props.tvSeries;
    }
    return (
      <>
        <div className="row justify-content-between mt-5">
          <div>
            <select
              className="form-select form-select-lg mb-3 mr-5 genre-select"
              aria-label=".form-select-lg example"
              value={''}
              onChange={this.selectChangeHandler}
            >
              <option defaultValue>Any genre</option>
              <option value="10759">Action & Andventure</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
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
          {this.props.loading && currentSeries.length !== 0 ? (
            <Loader></Loader>
          ) : (
            currentSeries.map((series) => {
              return (
                <div className="col-sm-4 mb-4" key={series.id}>
                  <FilmCard film={series}></FilmCard>
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
      
    tvSeries: state.film.series,
    loading: state.film.loading,
    search: state.film.search,
    filteredSeries: state.film.filteredSeries,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchFilms: () => dispatch(fetchFilms(true)),
    fetchSearchFilms: (value) => dispatch(fetchSearchFilms(value, true)),
    searchValue: (value) => dispatch(searchValue(value, true)),
    fetchFilmsByGenre: (id) => dispatch(fetchFilmsByGenre(id, true)),
    fetchSeriesByDate: (date, tvSeries) =>
      dispatch(fetchSeriesByDate(date, tvSeries)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Series);
