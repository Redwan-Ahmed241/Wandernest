import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <img className={styles.avatar} src="/Figma_photoes/ifty.jpg" alt="User" />
        <div>
          <div className={styles.userName}>Iftakhar Majumder</div>
          <div className={styles.userSubtitle}>Plan your next adventure</div>
        </div>
      </div>
      <nav className={styles.navMenu}>
        <button className={styles.navItem} onClick={() => navigate('/homepage')}>
          <span className={styles.icon}>●●●</span> Home
        </button>
        <button className={`${styles.navItem} ${window.location.pathname === '/my-trips' ? styles.active : ''}`} onClick={() => navigate('/my-trips')}>
          <span className={styles.icon}>●●●</span> My Trips
        </button>
        <button className={styles.navItem} onClick={() => navigate('/explore')}>
          <span className={styles.icon}>👓</span> Explore
        </button>
        <button className={styles.navItem} onClick={() => navigate('/plan-a-trip')}>
          <span className={styles.icon}>N</span> Plan a Trip
        </button>
        <button className={styles.navItem} onClick={() => navigate('/flights')}>
          <span className={styles.icon}>✈️</span> Flights
        </button>
        <button className={styles.navItem} onClick={() => navigate('/hotels-rooms')}>
          <span className={styles.icon}>🛏️</span> Hotels
        </button>
        <button className={styles.navItem} onClick={() => navigate('/rent-vehicles')}>
          <span className={styles.icon}>🚗</span> Cars
        </button>
        <button className={styles.navItem} onClick={() => navigate('/gift-cards')}>
          <span className={styles.icon}>🎁</span> Gift Cards
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar; 