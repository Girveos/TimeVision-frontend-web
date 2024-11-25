import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import NewsCard from "../../organisms/newsCard/NewsCard";
import NotificationCard from "../../organisms/notificationCard/NotificationCard";
import StatisticsCard from "../../organisms/statisticsCard/StatisticsCard";
import personalEnTurnoIcon from "../../../assets/personalEnTurno1.png";
import personalEnLicenciaIcon from "../../../assets/personalEnLicencia1.png";
import personalDisponiblecon from "../../../assets/personalDisponible1.png";
import { BellOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getUser } from "../../../config/routes";
import Header from "../../organisms/header/Header";

const Home = () => {
  const [user, setUser] = useState(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser();
        if (response.success) {
          const userData = {
            name: response.data.name,
            lastname: response.data.lastname,
            photo: response.data.photo,
            email: response.data.email,
            position: response.data.position,
            department: response.data.id_department
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        }
      } catch (err) {
        console.error("Error al obtener el usuario:", err);
      }
    };

    fetchUserData();
  }, []);

  const scrollLeft = () => {
    if (notificationsRef.current) {
      const scrollAmount = notificationsRef.current.offsetWidth;
      notificationsRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (notificationsRef.current) {
      const scrollAmount = notificationsRef.current.offsetWidth;
      notificationsRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="HomeScreen">
      <Header title={"Panel principal"} user={user}/>
      <div className="bodyContent">
        <div className="newsNotification">
          <div className="titleNews">
            <p>Novedades</p>
          </div>
          <div className="newscard-scroll">
            <NewsCard
              title="Cambio de turno"
              date="12/09/2024"
              message="Cambio de turno aprobado para el 15 de Septiembre"
              employee="Juan Perez"
              width="30vw"
            />
            <NewsCard
              title="Cambio de turno"
              date="12/09/2024"
              message="Cambio de turno aprobado para el 15 de Septiembre"
              employee="Juan Perez"
              width="30vw"
            />
            <NewsCard
              title="Cambio de turno"
              date="12/09/2024"
              message="Cambio de turno aprobado para el 15 de Septiembre"
              employee="Juan Perez"
              width="30vw"
            />
            <NewsCard
              title="Cambio de turno"
              date="12/09/2024"
              message="Cambio de turno aprobado para el 15 de Septiembre"
              employee="Juan Perez"
              width="30vw"
            />
            <NewsCard
              title="Cambio de turno"
              date="12/09/2024"
              message="Cambio de turno aprobado para el 15 de Septiembre"
              employee="Juan Perez"
              width="30vw"
            />
          </div>
        </div>
        <div className="staticsNotification">
          <div className="notificationsSection">
            <p>
              Notificaciones
              <span className="bell-icon">
                <BellOutlined />
              </span>
            </p>
            <div className="notificationsContainer">
              <button className="scroll-btn left" onClick={scrollLeft}>
                <LeftOutlined />
              </button>
              <div className="notifications-list" ref={notificationsRef}>
                <NotificationCard
                  ticket="Ticket #123"
                  date="12/09/24"
                  title="Día libre"
                  employee="Julián Cortés"
                />
                <NotificationCard
                  ticket="Ticket #124"
                  date="13/09/24"
                  title="Día libre"
                  employee="Ana Pérez"
                />
                <NotificationCard
                  ticket="Ticket #125"
                  date="14/09/24"
                  title="Vacaciones"
                  employee="Carlos López"
                />
                <NotificationCard
                  ticket="Ticket #123"
                  date="12/09/24"
                  title="Día libre"
                  employee="Julián Cortés"
                />
                <NotificationCard
                  ticket="Ticket #124"
                  date="13/09/24"
                  title="Día libre"
                  employee="Ana Pérez"
                />
                <NotificationCard
                  ticket="Ticket #125"
                  date="14/09/24"
                  title="Vacaciones"
                  employee="Carlos López"
                />
              </div>
              <button className="scroll-btn right" onClick={scrollRight}>
                <RightOutlined />
              </button>
            </div>
          </div>
          <div className="statisticsSection">
            <p className="statisticsTitle">Estadísticas</p>
            <StatisticsCard
              label="Personal en turno"
              color="#E4F0FF"
              colorB="#70A6E8"
              percentage={40}
              iconImage={personalEnTurnoIcon}
            />
            <StatisticsCard
              label="Personal en licencia"
              color="#FFEADA"
              colorB="#F79042"
              percentage={50}
              iconImage={personalEnLicenciaIcon}
            />
            <StatisticsCard
              label="Personal disponible"
              color="#DDF9E4"
              colorB="#2BC255"
              percentage={10}
              iconImage={personalDisponiblecon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
