import { FunctionComponent, useCallback } from 'react';
import {useNavigate} from "react-router-dom";
import styles from '../Styles/Destinations.module.css';
import Layout from '../App/Layout';


const Destinations:FunctionComponent = () => {
  	const navigate = useNavigate();
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	
  	const onDepth5FrameClick = useCallback(() => {
    		navigate("/");
  	}, [navigate]);
  	
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
                  									<div className={styles.destinationCard} onClick={() => navigate('/coxsbazar')}>
                    										<img className={styles.destinationImage} alt="Cox's Bazar" src="/Figma_photoes/cox.jpg" />
                    										<div className={styles.destinationContent}>
                      											<div className={styles.destinationTitle}>Cox's Bazar</div>
                      											<div className={styles.destinationDescription}>World's longest sea beach</div>
                    										</div>
                  									</div>
                  									<div className={styles.destinationCard} onClick={() => navigate('/sundarban')}>
                    										<img className={styles.destinationImage} alt="Sundarbans" src="/Figma_photoes/sundarban.jpg" />
                    										<div className={styles.destinationContent}>
                      											<div className={styles.destinationTitle}>Sundarbans</div>
                      											<div className={styles.destinationDescription}>Discover the mangrove forest</div>
                    										</div>
                  									</div>
                  									<div className={styles.destinationCard} onClick={() => navigate('/bandarban')}>
                    										<img className={styles.destinationImage} alt="Bandarban" src="/Figma_photoes/bandarban.jpg" />
                    										<div className={styles.destinationContent}>
                      											<div className={styles.destinationTitle}>Bandarban</div>
                      											<div className={styles.destinationDescription}>Hills and waterfalls</div>
                    										</div>
                  									</div>
                  									<div className={styles.destinationCard} onClick={() => navigate('/sylhet')}>
                    										<img className={styles.destinationImage} alt="Sylhet" src="/Figma_photoes/sylhet.jpg" />
                    										<div className={styles.destinationContent}>
                      											<div className={styles.destinationTitle}>Sylhet</div>
                      											<div className={styles.destinationDescription}>Lush tea gardens</div>
                    										</div>
                  									</div>
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
        				