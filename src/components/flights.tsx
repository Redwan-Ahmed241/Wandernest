import { FunctionComponent, useCallback } from 'react';
import {useNavigate} from "react-router-dom";
import styles from './flight.module.css';


const Flights:FunctionComponent = () => {
  	const navigate = useNavigate();
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	
  	const onFlightsTextClick = useCallback(() => {
    		navigate("/");
  	}, [navigate]);
  	
  	
  	const onDepth7FrameClick = useCallback(() => {
    		const anchor = document.querySelector("[data-scroll-to='image1']");
    		if(anchor) {
      			anchor.scrollIntoView({"block":"start","behavior":"smooth"})
    		}
  	}, []);
  	
  	
  	const onDepth7FrameClick1 = useCallback(() => {
    		const anchor = document.querySelector("[data-scroll-to='depth4Frame6']");
    		if(anchor) {
      			anchor.scrollIntoView({"block":"start","behavior":"smooth"})
    		}
  	}, []);
  	
  	return (
    		<div className={styles.flights}>
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
                								<div className={styles.depth4Frame1} onClick={() => navigate('/destinations')}>
                  									<div className={styles.destinations}>Destinations</div>
                								</div>
                								<div className={styles.depth4Frame1} onClick={() => navigate('/hotels-rooms')}>
                  									<div className={styles.destinations}>Hotels</div>
                								</div>
                								<div className={styles.depth5Frame2}>
                  									<div className={styles.flights1} onClick={onFlightsTextClick}>Flights</div>
                								</div>
                								<div className={styles.depth4Frame1} onClick={() => navigate('/packages')}>
                  									<div className={styles.destinations}>Packages</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame11}>
                								<div className={styles.depth5Frame01} onClick={onDepth4FrameClick}>
                  									<div className={styles.depth6Frame0}>
                    										<b className={styles.signUp}>Sign up</b>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame11}>
                  									<div className={styles.depth6Frame0}>
                    										<b className={styles.signUp}>Log in</b>
                  									</div>
                								</div>
                								<img className={styles.depth5Frame21} alt="" src="/Figma_photoes/world.svg" />
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.depth2Frame1}>
          					<div className={styles.depth3Frame01}>
            						<div className={styles.depth4Frame02}>
              							<div className={styles.depth5Frame02}>
                								<div className={styles.depth6Frame02}>
                  									<img className={styles.depth7Frame0} alt="" src="/Figma_photoes/l.svg" />
                  									<div className={styles.depth5Frame2}>
                    										<div className={styles.depth8Frame0}>
                      											<div className={styles.searchFlights}>WanderNest</div>
                    										</div>
                    										<div className={styles.depth8Frame1}>
                      											<div className={styles.exploreTheWorld}>Explore the world with us</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth6Frame1}>
                  									<div className={styles.depth7Frame01}>
                    										<img className={styles.depth8Frame01} alt="" src="/Figma_photoes/flight.svg" />
                    										<div className={styles.depth5Frame2}>
                      											<div className={styles.destinations}>Flights</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth7Frame11} onClick={onDepth7FrameClick}>
                    										<img className={styles.depth8Frame01} alt="" src="/Figma_photoes/k.svg" />
                    										<div className={styles.depth5Frame2}>
                      											<div className={styles.destinations}>Real-time Forecast</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth7Frame2} onClick={onDepth7FrameClick1}>
                    										<img className={styles.depth8Frame01} alt="" src="/Figma_photoes/coin.svg" />
                    										<div className={styles.depth5Frame2}>
                      											<div className={styles.destinations}>Currency Monitor</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.depth3Frame11}>
            						<div className={styles.depth4Frame03}>
              							<div className={styles.depth5Frame03}>
                								<div className={styles.depth5Frame2}>
                  									<div className={styles.discoverYourNext}>Discover Your Next Flight</div>
                								</div>
                								<div className={styles.depth6Frame11}>
                  									<div className={styles.searchAndBook}>Search and book flights to your dream destination.</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.depth4Frame12}>
              							<div className={styles.depth5Frame04}>
                								<div className={styles.depth6Frame04}>
                  									<div className={styles.searchFlights}>Search Flights</div>
                								</div>
                								<div className={styles.depth6Frame12}>
                  									<div className={styles.enterCityOr}>Enter  city or airport</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.depth4Frame2}>
              							<div className={styles.depth5Frame05}>
                								<div className={styles.depth6Frame0}>
                  									<b className={styles.searchFlights1}>Search Flights</b>
                								</div>
              							</div>
            						</div>
            						<div className={styles.depth4Frame3}>
              							<b className={styles.realTimeWeatherForecast}>Real-Time Weather Forecast</b>
            						</div>
            						<div className={styles.depth4Frame4}>
              							<img className={styles.image1Icon} alt="" src="/Figma_photoes/weather.png" />
            						</div>
            						<div className={styles.depth4Frame3}>
              							<b className={styles.realTimeWeatherForecast}>Currency Rate Monitor</b>
            						</div>
            						<div className={styles.depth4Frame6} data-scroll-to="depth4Frame6">
              							<div className={styles.depth5Frame06}>
                								<div className={styles.depth6Frame06}>
                  									<div className={styles.searchFlights}>Currency Rates Over Time</div>
                								</div>
                								<div className={styles.depth6Frame13}>
                  									<b className={styles.todaysExchangeRates}>Today's Exchange Rates</b>
                    										</div>
                    										<div className={styles.depth6Frame2}>
                      											<div className={styles.depth5Frame2}>
                        												<div className={styles.searchAndBook}>Last 7 Days</div>
                      											</div>
                      											<div className={styles.depth7Frame12}>
                        												<div className={styles.searchFlights}>+2%</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame3}>
                      											<img className={styles.depth7Frame03} alt="" src="/Figma_photoes/currency.png" />
                      											<div className={styles.depth7Frame13}>
                        												<div className={styles.depth5Frame2}>
                          													<b className={styles.usd}>USD</b>
                        												</div>
                        												<div className={styles.depth5Frame2}>
                          													<b className={styles.usd}>EUR</b>
                        												</div>
                        												<div className={styles.depth5Frame2}>
                          													<b className={styles.usd}>GBP</b>
                        												</div>
                        												<div className={styles.depth5Frame2}>
                          													<b className={styles.usd}>JPY</b>
                        												</div>
                        												<div className={styles.depth5Frame2}>
                          													<b className={styles.usd}>AUD</b>
                        												</div>
                      											</div>
                    										</div>
                    										</div>
                    										</div>
                    										</div>
                    										</div>
                    										<div className={styles.footer}>
                      											<div className={styles.depth3Frame02}>
                        												<div className={styles.depth4Frame04}>
                          													<div className={styles.depth5Frame07}>
                            														<div className={styles.depth6Frame07} onClick={onDepth4FrameClick}>
                              															<div className={styles.searchAndBook}>About Us</div>
                            														</div>
                            														<div className={styles.depth6Frame14}>
                              															<div className={styles.searchAndBook}>Contact</div>
                            														</div>
                            														<div className={styles.depth6Frame07} onClick={onDepth4FrameClick}>
                              															<div className={styles.searchAndBook}>Terms of Service</div>
                            														</div>
                            														<div className={styles.depth6Frame07} onClick={onDepth4FrameClick}>
                              															<div className={styles.searchAndBook}>Privacy Policy</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth5Frame12}>
                            														<img className={styles.depth8Frame01} alt="" src="/Figma_photoes/facebook.svg" />
                            														<img className={styles.depth8Frame01} alt="" src="/Figma_photoes/twitter.svg" />
                            														<img className={styles.depth8Frame01} alt="" src="/Figma_photoes/insta.svg" />
                          													</div>
                          													<div className={styles.depth5Frame22}>
                            														<div className={styles.searchAndBook}>@2025 WanderNest, All rights reserved.</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										</div>
                    										</div>);
                    										};
                    										
                    										export default Flights;
                    										