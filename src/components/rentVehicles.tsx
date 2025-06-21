import { FunctionComponent, useCallback } from 'react';
import styles from './rentVehicles.module.css';
import { useNavigate } from 'react-router-dom';

const RentVehicles:FunctionComponent = () => {
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
	 const navigate = useNavigate(); 
  	
  	return (
    		<div className={styles.rentVehicles}>
      			<div className={styles.depth0Frame0}>
        				<div className={styles.depth1Frame0}>
          					<div className={styles.navbarWrapper}>
            						<div className={styles.navbar}>
              							<div className={styles.depth3Frame0}>
                								<img className={styles.depth4Frame0} alt="" src="/Figma_photoes/wandernest.svg" />
                								<div className={styles.depth4Frame1} onClick={() => navigate('/homepage')}>
                  									<b className={styles.wandernest}>WanderNest</b>
                								</div>
              							</div>
              							<div className={styles.depth3Frame1}>
                								<div className={styles.depth4Frame01}>
                  									<div className={styles.depth4Frame1} onClick={onDepth4FrameClick}>
                    										<div className={styles.destinations}>Destinations</div>
                  									</div>
                  									<div className={styles.depth4Frame1} onClick={onDepth4FrameClick}>
                    										<div className={styles.destinations}>Hotels</div>
                  									</div>
                  									<div className={styles.depth5Frame2}>
                    										<div className={styles.flights} onClick={onDepth4FrameClick}>Flights</div>
                  									</div>
                  									<div className={styles.depth4Frame1} onClick={onDepth4FrameClick}>
                    										<div className={styles.destinations}>Packages</div>
                  									</div>
                								</div>
                								<div className={styles.depth4Frame11}>
                  									<div className={styles.depth5Frame01} onClick={onDepth4FrameClick}>
                    										<div className={styles.depth6Frame0}>
                      											<b className={styles.signUp}>Sign up</b>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame11} onClick={onDepth4FrameClick}>
                    										<div className={styles.depth6Frame0}>
                      											<b className={styles.signUp}>Log in</b>
                    										</div>
                  									</div>
                  									<img className={styles.depth5Frame21} alt="" src="/Figma_photoes/World.svg" />
                								</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.depth2Frame1}>
            						<div className={styles.depth3Frame01}>
              							<div className={styles.depth4Frame02}>
                								<div className={styles.depth5Frame02}>
                  									<div className={styles.depth6Frame02}>
                    										<div className={styles.depth7Frame0}>
                      											<div className={styles.depth8Frame0}>
                        												<div className={styles.exploreTheWorld}>Explore the World with WanderNest</div>
                      											</div>
                      											<div className={styles.depth8Frame1}>
                        												<div className={styles.findThePerfect}>Find the perfect rental car for your journey.</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth7Frame1}>
                      											<div className={styles.depth8Frame01}>
                        												<img className={styles.depth9Frame0} alt="" src="/Figma_photoes/search.svg" />
                        												<div className={styles.depth9Frame1}>
                          													<div className={styles.searchVehicles}>Search  vehicles</div>
                        												</div>
                        												<div className={styles.depth9Frame2}>
                          													<div className={styles.depth10Frame0}>
                            														<div className={styles.depth6Frame0}>
                              															<b className={styles.search}>Search</b>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame12}>
                								<b className={styles.featuredVehicles}>Featured Vehicles</b>
              							</div>
              							<div className={styles.depth4Frame2}>
                								<div className={styles.depth5Frame03}>
                  									<div className={styles.depth6Frame03}>
                    										<img className={styles.depth7Frame01} alt="" src="\Figma_photoes\Exclusive-Car-Rental-Service-in-DhakaBangladesh-882.jpeg" />
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.suvRentals}>SUV Rentals</div>
                      											</div>
                      											<div className={styles.depth8Frame11}>
                        												<div className={styles.comfortableSuvsFor}>Comfortable SUVs for any terrain</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame03}>
                    										<img className={styles.depth7Frame01} alt="" src="\Figma_photoes\ae8ef25b785c816e4f8cad21d2f5bbc8.jpg" />
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.suvRentals}>Luxury Cars</div>
                      											</div>
                      											<div className={styles.depth8Frame11}>
                        												<div className={styles.comfortableSuvsFor}>Premium cars for special occasions</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame03}>
                    										<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/Eco.jpg" />
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.suvRentals}>Economy Options</div>
                      											</div>
                      											<div className={styles.depth8Frame11}>
                        												<div className={styles.comfortableSuvsFor}>Affordable cars for daily use</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame12}>
                								<b className={styles.featuredVehicles}>Our Services</b>
              							</div>
              							<div className={styles.depth4Frame2}>
                								<div className={styles.depth5Frame03}>
                  									<div className={styles.depth6Frame04}>
                    										<img className={styles.depth7Frame04} alt="" src="Depth 7, Frame 0.svg" />
                    										<div className={styles.depth7Frame14}>
                      											<div className={styles.depth8Frame05}>
                        												<b className={styles.customerSupport}>24/7 Customer Support</b>
                      											</div>
                      											<div className={styles.depth8Frame11}>
                        												<div className={styles.comfortableSuvsFor}>Always here to assist you</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame04}>
                    										<img className={styles.depth7Frame04} alt="" src="Depth 7, Frame 0.svg" />
                    										<div className={styles.depth7Frame14}>
                      											<div className={styles.depth8Frame05}>
                        												<b className={styles.customerSupport}>Flexible Booking</b>
                      											</div>
                      											<div className={styles.depth8Frame11}>
                        												<div className={styles.comfortableSuvsFor}>Adjust your plans anytime</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame04}>
                    										<img className={styles.depth7Frame04} alt="" src="Depth 7, Frame 0.svg" />
                    										<div className={styles.depth7Frame14}>
                      											<div className={styles.depth8Frame05}>
                        												<b className={styles.customerSupport}>Insurance Coverage</b>
                      											</div>
                      											<div className={styles.depth8Frame11}>
                        												<div className={styles.comfortableSuvsFor}>Drive worry-free with full coverage</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.depth3Frame11}>
              							<div className={styles.depth4Frame03} />
            						</div>
          					</div>
        				</div>
      			</div>
      			<div className={styles.footer}>
        				<div className={styles.depth3Frame02}>
          					<div className={styles.depth4Frame04}>
            						<div className={styles.depth5Frame05}>
              							<div className={styles.depth6Frame05} onClick={onDepth4FrameClick}>
                								<div className={styles.findThePerfect}>About Us</div>
              							</div>
              							<div className={styles.depth6Frame12}>
                								<div className={styles.findThePerfect}>Contact</div>
              							</div>
              							<div className={styles.depth6Frame05} onClick={onDepth4FrameClick}>
                								<div className={styles.findThePerfect}>Terms of Service</div>
              							</div>
              							<div className={styles.depth6Frame05} onClick={onDepth4FrameClick}>
                								<div className={styles.findThePerfect}>Privacy Policy</div>
              							</div>
            						</div>
            						<div className={styles.depth5Frame12}>
              							<img className={styles.depth6Frame06} alt="" src="/Figma_photoes/facebook.svg" />
              							<img className={styles.depth6Frame06} alt="" src="/Figma_photoes/twitter.svg" />
              							<img className={styles.depth6Frame06} alt="" src="/Figma_photoes/insta.svg" />
            						</div>
            						<div className={styles.depth5Frame22}>
              							<div className={styles.findThePerfect}>@2025 WanderNest, All rights reserved.</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default RentVehicles;
