import React from "react";
import "./RatingStar.css";

const RatingStarComponent = ({ rating, handleClick, small = true }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const starClass = i <= rating ? (small ? "star active sm" : "star active") : small ? "star sm" : "star";
    stars.push(
      <React.Fragment key={i}>
        <li className={starClass} onClick={() => (small ? false : handleClick(i))}></li>&nbsp;&nbsp;
      </React.Fragment>
    );
  }
  return <ul className={`rating ${small ? "sm" : ""}`}>{stars}</ul>;
};

export default RatingStarComponent;
