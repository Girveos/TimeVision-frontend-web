import React from "react";
import "./CalendarScreen.css";
import Calendar from "../../organisms/calendar/Calendar";
import Header from "../../organisms/header/Header";

const CalendarScreen = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="calendarScreen">
      <Header title={"Calendario"} user={user} />
      <div className="body-calendar">
        <Calendar/>
      </div>
    </div>
  );
};

export default CalendarScreen;
