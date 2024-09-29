import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Principal from '../../components/Principal/Principal';
import NavBar from '../../components/NavBar/NavBar';
import '../Home/Styles/home.css'

export const Home = () => {
  const [activeMenu, setActiveMenu] = useState('Home');
  const userRole = useSelector((state) => state.user.role); 

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="DashboardWrapper">
      <NavBar />
      <div className="MainContent">
        <div className="Sidebar"> 
          {userRole === 'admin' && (
            <div className="MenuItem" onClick={() => handleMenuClick('Registro')}>Registro</div>
          )}
          <div className="MenuItem" onClick={() => handleMenuClick('Colectivos')}>Colectivos</div>
          <div className="MenuItem" onClick={() => handleMenuClick('Mantenimientos')}>Mantenimientos</div>
        </div>
        <div className="ContentArea"> 
          <Principal activeMenu={activeMenu} />
        </div>
      </div>
    </div>
  );
};
export default Home;
