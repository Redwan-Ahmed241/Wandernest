import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import styles from '../Styles/Destinations.module.css';
import Layout from '../App/Layout';
import { getDestinations } from '../App/api-services';

const MEDIA_BASE = "https://wander-nest-ad3s.onrender.com";

const incrementDestinationClick = async (id: number) => {
  try {
    await fetch(`https://wander-nest-ad3s.onrender.com/api/home/destinations/${id}/click/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // Optionally handle error
  }
}

const Destinations:FunctionComponent = () => {
  	const navigate = useNavigate();
  	const [destinations, setDestinations] = useState<any[]>([]);
  	const [loading, setLoading] = useState(true);
  	const [error, setError] = useState('');
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	
  	const onDepth5FrameClick = useCallback(() => {
    		navigate("/");
  	}, [navigate]);
  	
  	useEffect(() => {
    		const fetchDestinations = async () => {
      			setLoading(true);
      			setError('');
      			try {
        				const data = await getDestinations();
        				setDestinations(Array.isArray(data) ? data : []);
      			} catch (err) {
        				setError('Failed to fetch destinations');
        				setDestinations([]);
      			} finally {
        				setLoading(false);
      			}
    		};
    		fetchDestinations();
  	}, []);
  	
  	return (
		<Layout>
    		<div className={styles.destinations}>
      			<div className={styles.depth0Frame0}>
        				<div className={styles.depth1Frame0}>
          					<div className={styles.depth2Frame1}>
            						<div className={styles.depth3Frame01}>
              							<div className={styles.depth4Frame02}>
                								<div className={styles.depth5Frame02}>
                  									<div className={styles.depth6Frame02}>
                    										<div className={styles.depth7Frame0}>
                      											<div className={styles.depth5Frame2}>
                        												<b className={styles.discoverTopDestinations}>Discover Top Destinations in Bangladesh</b>
                      											</div>
                    										</div>
                    										<b className={styles.travelFarTravel}>Travel far, travel wide</b>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame12}>
                								<b className={styles.exploreDestinations}>Explore Destinations</b>
              							</div>
              							<div className={styles.depth4Frame2}>
                								<div className={styles.destinationsGrid}>
                  									{loading && (
                    										<div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                      											Loading destinations...
                    										</div>
                  									)}
                  									{error && (
                    										<div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                      											{error}
                    										</div>
                  									)}
                  									{!loading && !error && destinations.map((dest, idx) => (
                    										<div
                      											className={styles.destinationCard}
                      											key={dest.id || idx}
                      											onClick={async () => { await incrementDestinationClick(dest.id); navigate(`/destination-01`); }}
                      											style={{ cursor: 'pointer' }}
                    										>
                      											<img className={styles.destinationImage} alt={dest.name || dest.title} src={dest.image ? MEDIA_BASE + dest.image : '/Figma_photoes/cox.jpg'} />
                      											<div className={styles.destinationContent}>
                        												<div className={styles.destinationTitle}>{dest.name || dest.title}</div>
                        												<div className={styles.destinationDescription}>{dest.subtitle || dest.description}</div>
                      											</div>
                    										</div>
                  									))}
                								</div>
              							</div>
              							<div className={styles.depth4Frame3}>
                								<div className={styles.depth5Frame04}>
                  									<div className={styles.depth6Frame11}>
                    										<div className={styles.depth7Frame06}>
                      											<div className={styles.depth8Frame06}>
                        											<div className={styles.depth9Frame0} onClick={() => navigate('/packages')}>
                          												<div className={styles.depth6Frame0}>
                            													<b className={styles.explorePackages}>Explore Packages</b>
                          												</div>
                        											</div>
                        											<div className={styles.depth9Frame1}>
                          												<div className={styles.depth6Frame0}onClick={() => navigate('/contact')}>
                            													<b className={styles.explorePackages}>Contact Us</b>
                          												</div>
                        											</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>
		</Layout>
	);
};

export default Destinations;

export {}
        				