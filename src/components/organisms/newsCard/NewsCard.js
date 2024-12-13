import React from "react";
import "./NewsCard.css";

const NewsCard = ({ title, type, date, message, employee}) => {
  return (
    <div className="cardNews" >
      <div className="cardHeader">
        <h3>{type}</h3>
        <span>{" "}
        {new Intl.DateTimeFormat("es-CO", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        })
          .format(new Date(date))
          .replaceAll("/", "-")}</span>
      </div>
      <p>{title}</p>
      <p>{message}</p>
      <p>Empleado: {employee}</p>
    </div>
  );
};

export default NewsCard;
