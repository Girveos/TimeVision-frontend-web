import React from 'react'
import './Employees.css'
import Header from '../../organisms/header/Header';

const Employees = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="employeesScreen">
      <Header title={"Empleados"} user={user} />
      <div className="body-employees"></div>
    </div>
  )
}

export default Employees