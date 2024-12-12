import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import NewsCard from "../../organisms/newsCard/NewsCard";
import NotificationCard from "../../organisms/notificationCard/NotificationCard";
import StatisticsCard from "../../organisms/statisticsCard/StatisticsCard";
import personalEnTurnoIcon from "../../../assets/personalEnTurno1.png";
import personalEnLicenciaIcon from "../../../assets/personalEnLicencia1.png";
import personalDisponiblecon from "../../../assets/personalDisponible1.png";
import { BellOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getRequest, getUser } from "../../../config/routes";
import Header from "../../organisms/header/Header";
import { Spin } from "antd";


const Home = () => {
  const [user, setUser] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
            department: response.data.department_name,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        }
      } catch (err) {
        console.error("Error al obtener el usuario:", err);
      }
    };

    const fetchRequest = async () => {
      try {
        setIsLoading(true);
        const response = await getRequest();
        if (response.success) {
          const sortedRequests = response.data
            .filter((request) => request.state.toLowerCase() === "pendiente")
            .sort((a, b) => new Date(a.create_date) - new Date(b.create_date));
          console.log(sortedRequests);
          setSolicitudes(sortedRequests);
        }
      } catch (err) {
        console.error("Error al obtener las solicitudes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    fetchRequest();
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
      <Header title={"Panel principal"} user={user} />
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
            <div className="noti-title">
            <p>Notificaciones</p>
            <div className="bell-icon">
            <BellOutlined />
            <div
              className={` ${
                solicitudes.length ? "noti-status" : "noti-status-none"
              }`}
            ></div>
            </div>
            </div>
            
            <p className="noti-pending-label">
              Solicitudes pendientes por revisar
            </p>
            <div className="notificationsContainer">
              <button className={` ${
                solicitudes.length ? "scroll-btn left" : "scroll-btn-none"
              }`} onClick={scrollLeft}>
                <LeftOutlined />
              </button>
              <div className="notifications-list" ref={notificationsRef}>
                {isLoading ? (
                  <div className="loading-container">
                    <Spin size="large" tip="Cargando solicitudes..." />
                  </div>
                ) : solicitudes.length > 0 ? (
                  solicitudes.map((solicitud) => {
                    return (
                      <NotificationCard key={solicitud._id} data={solicitud} />
                    );
                  })
                ) : (
                  <div className="no-results-home">
                    <p>No tiene solicitudes pendientes por revisar</p>
                  </div>
                )}
              </div>
              <button className={` ${
                solicitudes.length ? "scroll-btn right" : "scroll-btn-none"
              }`} onClick={scrollRight}>
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