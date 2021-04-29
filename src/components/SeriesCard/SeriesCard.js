import "./SeriesCard.scss";
import error from "../../images/error.png";
import { Link } from "react-router-dom";
const SeriesCard = (props) => {
  const current = props.series;

  const cls = ["card-rate"];
  if (current.vote_average > 7) cls.push("excelent");
  else if (current.vote_average > 5) cls.push("good");
  else cls.push("bad");

  return (
    <div className="card">
      <Link to={"/profile/series/" + current.id}>
        <img
          src={
            current.poster_path
              ? `https://image.tmdb.org/t/p/w500${current.poster_path}`
              : `${error}`
          }
          alt={`${current.name}`}
          className="card-img-top"
        ></img>
        <div className=" card-body card-info">
          <span className="">{current.first_air_date}</span>
          <span className={cls.join(" ")}> {current.vote_average}</span>
        </div>
      </Link>
    </div>
  );
};
export default SeriesCard;