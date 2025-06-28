import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleAuthClick = useCallback(() => {
    navigate('/login'); // Or '/signup' based on context
    navigate('/signup'); // Redirect to signup page
  }, [navigate]);

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.depth3Frame0}>
          <img className={styles.depth4Frame0} alt="Logo" src="/Figma_photoes/wandernest.svg" />
          <div className={styles.depth4Frame1} onClick={goHome}>
            <b className={styles.wandernest}>WanderNest</b>
          </div>
        </div>

        <div className={styles.depth3Frame1}>
          <div className={styles.depth4Frame01}>
            <div className={styles.depth4Frame1} onClick={() => navigate('/destinations')}>
              <div className={styles.destinations}>Destinations</div>
            </div>
            <div className={styles.depth4Frame1} onClick={() => navigate('/hotels-rooms')}>
              <div className={styles.destinations}>Hotels</div>
            </div>
            <div className={styles.depth5Frame2}onClick={() => navigate('/flights')}>
              <div className={styles.flights} >Flights</div>
            </div>
            <div className={styles.depth4Frame1} onClick={() => navigate('/Packages')}>
              <div className={styles.destinations}>Packages</div>
            </div>
          </div>

          <div className={styles.depth4Frame11}>
            <div className={styles.depth5Frame01} onClick={() => navigate('/signup')}>
              <div className={styles.depth6Frame0}>
                <b className={styles.signUp}>Sign up</b>
              </div>
            </div>
            <div className={styles.depth5Frame11} onClick={() => navigate('/login')}>
              <div className={styles.depth6Frame0}>
                <b className={styles.signUp}>Log in</b>
              </div>
            </div>
            <img className={styles.depth5Frame21} alt="" src="/Figma_photoes/world.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
