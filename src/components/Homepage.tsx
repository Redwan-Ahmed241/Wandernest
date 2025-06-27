import { FunctionComponent } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Homepage.module.css';
import Layout from './Layout';

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate();

  const Destinations = [
    {
      name: 'Srimangal',
      image: '/Figma_photoes/srimangal.png',
      description: 'Explore lush tea gardens',
      destination: 'srimangal',
      price: '$220/person',
    },
    {
      name: "Cox's Bazar",
      image: '/Figma_photoes/cox.jpg',
      description: "Enjoy the world's longest sea beach",
      destination: 'coxsbazar',
      price: '$150/person',
    },
    {
      name: 'Sundarbans',
      image: '/Figma_photoes/deer.jpg',
      description: 'Discover the mangrove forest',
     // destination: 'sundarbans',
      price: '$250/person',
    },
    {
      name: 'Rangamati',
      image: '/Figma_photoes/rangamati01-1.jpg',
      description: 'Discover the lavish landscapes between hills and lakes',
      destination: 'rangamati',
      price: '$180/person',
    },
    {
      name: 'Bandarban',
      image: '/Figma_photoes/bandorban.jpg',
      description: 'Discover the Hills',
      destination: 'bandarban',
      price: '$300/person',
    },
  ];



  return (
    <Layout>
      <main className={styles.homePage}>
        <div className={styles.depth6Frame02}>
          <div className={styles.heroContentWrapper}>
            <div className={styles.depth7Frame0}>
              <div className={styles.discoverTheBeauty}>
                Discover the beauty and culture of Bangladesh with our tailored travel services.
              </div>
            </div>
            <div className={styles.exploreBangladeshWith}>
              Explore Bangladesh with WanderNest
            </div>
          </div>
        </div>

        <div className={styles.Destinations}>
          <h2 className={styles.sectionTitle}>Featured Destinations</h2>
          <div className={styles.destinationsGrid}>
            {Destinations.map((place, index) => (
              <div
                key={index}
                className={styles.destinationCard}
               // onClick={() => handleCardClick(place.destination)}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className={styles.destinationImage}
                />
                <div className={styles.destinationContent}>
                  <div className={styles.destinationTitle}>
                    {place.name}
                    <span className={styles.destinationTag}> — {place.destination}</span>
                  </div>
                  <div className={styles.destinationDescription}>
                    {place.description}
                  </div>
                  <div className={styles.destinationPrice}>{place.price}</div>
                  <button
                    type="button"
                    className={styles.bookButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Booking for ${place.name}`);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.depth4Frame12}>
          <b className={styles.featuredDestinations}>Our Services</b>
        </div>

        <div className={styles.depth4Frame4}>
          <div className={styles.depth5Frame04}>
            <div className={styles.depth6Frame04}>
              <img className={styles.depth7Frame05} alt="Visa" src="/Figma_photoes/visa.svg" />
              <div className={styles.depth7Frame14}>
                <div className={styles.depth8Frame04}>
                  <b className={styles.visaAssistance}>Visa Assistance</b>
                </div>
                <div className={styles.depth7Frame1}>
                  <div className={styles.exploreLushTea}>Fast and reliable visa processing</div>
                </div>
              </div>
            </div>

            <div className={styles.depth6Frame04}>
              <img className={styles.depth7Frame05} alt="Travel Planner" src="/Figma_photoes/tp.svg" />
              <div className={styles.depth7Frame14}>
                <div className={styles.depth8Frame04}>
                  <b className={styles.visaAssistance}>Travel Planner</b>
                </div>
                <div className={styles.depth7Frame1}>
                  <div className={styles.exploreLushTea}>Customize your perfect trip</div>
                </div>
              </div>
            </div>

            <div className={styles.depth6Frame04}>
              <img className={styles.depth7Frame05} alt="Emergency Support" src="/Figma_photoes/em.svg" />
              <div className={styles.depth7Frame14}>
                <div className={styles.depth8Frame04}>
                  <b className={styles.visaAssistance}>Emergency Support</b>
                </div>
                <div className={styles.depth7Frame1}>
                  <div className={styles.exploreLushTea}>24/7 assistance during your travels</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
