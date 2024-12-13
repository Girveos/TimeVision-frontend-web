import React from "react";
import "./NotificationCard.css";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ data }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/requests/${id}`);
  };

  return (
    <div
      className="notificationCard"
      role="button"
      aria-label={`Notificación de solicitud ${data._id}`}
      onClick={() => handleCardClick(data._id)}
    >
      <div className="pending-request-circle"></div>
      <span>
        {" "}
        {new Intl.DateTimeFormat("es-CO", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        })
          .format(new Date(data.create_date))
          .replaceAll("/", "-")}
      </span>
      <h4>{data.type}</h4>
      <p>{data.user_name}</p>
    </div>
  );
};

export default NotificationCard;