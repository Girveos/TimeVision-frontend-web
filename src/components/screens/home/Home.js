import React from "react";
import "./Home.css";
import NewsCard from "../../organisms/newsCard/NewsCard";
import NotificationCard from "../../organisms/notificationCard/NotificationCard";
import StatisticsCard from "../../organisms/statisticsCard/StatisticsCard";
import personalEnTurnoIcon from '../../../assets/personalEnTurno.png';
import personalEnLicenciaIcon from '../../../assets/personalEnLicencia.png';
import personalDisponiblecon from '../../../assets/personalDisponible.png';

const Home = () => {
  return (
    <div className="HomeScreen">
      <div className="header">
        <h1>Panel principal</h1>
      </div>
      <div className="bodyContent">
        <div className="newsNotification">
          <div className="titleNews"><h2>Novedades</h2></div>
          <div><NewsCard
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
          /></div>
        
          
        </div>
        <div className="staticsNotification">
          <div className="notificationsSection">
            <h2>Notificaciones</h2>
            <div className="notificationsContainer">
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
          </div>
          <div className="statisticsSection">
            <h2>Estadísticas</h2>
            <StatisticsCard
              label="Personal en turno"
              color="#E4F0FF"
              colorB= "#70A6E8"
              percentage={40}
              iconImage={personalEnTurnoIcon}
            />
            <StatisticsCard
              label="Personal en licencia"
              color="#FFEADA"
              colorB= "#F79042"
              percentage={50}
              iconImage={personalEnLicenciaIcon}
            />
            <StatisticsCard
              label="Personal disponible"
              color="#DDF9E4"
              colorB= "#2BC255"
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
