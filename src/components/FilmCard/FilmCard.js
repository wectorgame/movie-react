import "./FilmCard.scss";
import error from "../../images/error.png";
import { Link } from "react-router-dom";
export const FilmCard = (film) => {
  const current = film.film;
  const cls = ["card-rate"];
  if (current.vote_average > 7) cls.push("excelent");
  else if (current.vote_average > 5) cls.push("good");
  else cls.push("bad");
  
  return (
    <div className="card">
      <Link to={"/profile/" + current.id}>
        <img
          src={
            current.poster_path
              ? `https://image.tmdb.org/t/p/w500${current.poster_path}`
              : `${error}`
          }
          alt={`${current.title}`}
          className="card-img-top"
        ></img>
        <div className=" card-body card-info">
          <span className="">{current.release_date}</span>
          <span className={cls.join(" ")}> {current.vote_average}</span>
        </div>
      </Link>
    </div>
  );
};
