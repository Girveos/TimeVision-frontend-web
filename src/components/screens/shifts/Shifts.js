import Header from "../../organisms/header/Header";
import "./Shifts.css";
import { useState } from "react";

export default function Shifts() {
  const [activeRange, setActiveRange] = useState("week");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleRangeClick = (range) => {
    setActiveRange(range);
  };
  const handleSelectUser = (userName) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userName)) {
        return prevSelected.filter((user) => user !== userName);
      } else {
        return [...prevSelected, userName];
      }
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="shiftsScreen">
      <Header title={"Turnos"} user={user}/>
      <div className="body-shifts">
      
      </div>
    </div>
  );
}
