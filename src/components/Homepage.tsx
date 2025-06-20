import { FunctionComponent, useCallback } from 'react';
import {useNavigate} from "react-router-dom";
import styles from './Homepage.module.css';
import Layout from './Layout';
const HomePage:FunctionComponent = () => {
  	const navigate = useNavigate();
  	
  	const onDepth4FrameClick = useCallback(() => {
    		navigate("/home-page");
  	}, [navigate]);
  	
  	
  	const onDepth5FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
		<Layout>
    		<button className={styles.homePage}>
      			<div className={styles.homePage1}>
        				<div className={styles.homePage2}>
          					<div className={styles.homePage3}>
            						<div className={styles.homePage4}>
              							<div className={styles.depth1Frame0}>
                								{/* <div className={styles.navbar}>
                                                      <div className={styles.depth3Frame0}>
                                                            <img className={styles.depth4Frame0} alt="" src="/Figma_photoes/wandernest.svg" />
                                                            <div className={styles.depth4Frame1} onClick={onDepth4FrameClick}>
                                                                  <b className={styles.wandernest}>WanderNest</b>
                                                            </div>
                                                      </div>
                                                      <div className={styles.depth3Frame1}>
                                                            <div className={styles.depth4Frame01}>
                                                                  <div className={styles.depth4Frame1}  onClick={() => navigate('/destinations')}>
                                                                        <div className={styles.destinations}>Destinations</div>
                                                                  </div>
                                                                  <div className={styles.depth4Frame1} onClick={() => navigate('/hotels-rooms')}>
                                                                        <div className={styles.destinations}>Hotels</div>
                                                                  </div>
                                                                  <div className={styles.depth5Frame2}>
                                                                        <div className={styles.flights} onClick={onDepth4FrameClick}>Flights</div>
                                                                  </div>
                                                                  <div className={styles.depth4Frame1} onClick={() => navigate('/packages')}>
                                                                        <div className={styles.destinations}>Packages</div>
                                                                  </div>
                                                            </div>
                                                            <div className={styles.depth4Frame11}>
                                                                  <div className={styles.depth5Frame01} onClick={onDepth5FrameClick}>
                                                                        <div className={styles.depth6Frame0}>
                                                                              <b className={styles.signUp}>Sign up</b>
                                                                        </div>
                                                                  </div>
                                                                  <div className={styles.depth5Frame11} onClick={onDepth5FrameClick}>
                                                                        <div className={styles.depth6Frame0}>
                                                                              <b className={styles.signUp}>Log in</b>
                                                                        </div>
                                                                  </div>
                                                                  <img className={styles.depth5Frame21} alt="" src="/Figma_photoes/world.svg" />
                                                            </div>
                                                      </div>
                								</div> */}
                								<div className={styles.depth2Frame1}>
                  									<div className={styles.depth3Frame01}>
                    										<div className={styles.depth4Frame02}>
                      											<div className={styles.depth5Frame02}>
                        												<div className={styles.depth6Frame02}>
                          													<div className={styles.depth7Frame0}>
                            														<div className={styles.depth8Frame1}>
                              															<div className={styles.discoverTheBeauty}>Discover the beauty and culture of Bangladesh with our tailored travel services.</div>
                            														</div>
                          													</div>
                          													<div className={styles.exploreBangladeshWith}>Explore Bangladesh with WanderNest</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth4Frame12}>
                      											<b className={styles.featuredDestinations}>Featured Destinations</b>
                    										</div>
                    										<div className={styles.depth4Frame2} onClick={onDepth5FrameClick}>
                      											<div className={styles.depth5Frame03}>
                        												<div className={styles.depth6Frame03}>
                          													<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/srimangal.png" />
                          													<div className={styles.depth7Frame1}>
                            														<div className={styles.depth7Frame1}>
                              															<div className={styles.srimangal}>Srimangal</div>
                            														</div>
                            														<div className={styles.depth7Frame1}>
                              															<div className={styles.exploreLushTea}>Explore lush tea gardens</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth6Frame1} onClick={onDepth5FrameClick}>
                          													<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/cox.jpg" />
                          													<div className={styles.depth7Frame1}>
                            														<div className={styles.depth7Frame1}>
                              															<div className={styles.srimangal}>Cox's Bazar</div>
                              															</div>
                              															<div className={styles.depth7Frame1}>
                                																<div className={styles.exploreLushTea}>Enjoy the world's longest sea beach</div>
                                																</div>
                              															</div>
                            														</div>
                            														<div className={styles.depth6Frame03}>
                              															<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/deer.jpg" />
                              															<div className={styles.depth7Frame1}>
                                																<div className={styles.depth7Frame1}>
                                  																	<div className={styles.srimangal}>Sundarbans</div>
                                																</div>
                                																<div className={styles.depth7Frame1}>
                                  																	<div className={styles.exploreLushTea}>Discover the mangrove forest</div>
                                																</div>
                              															</div>
                            														</div>
                            														<div className={styles.depth6Frame03}>
                              															<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/rangamati01-1.jpg" />
                              															<div className={styles.depth7Frame1}>
                                																<div className={styles.depth7Frame1}>
                                  																	<div className={styles.srimangal}>Rangamati</div>
                                																</div>
                                																<div className={styles.depth7Frame1}>
                                  																	<div className={styles.exploreLushTea}>Discover the lavish landscapes between hills and lakes</div>
                                																</div>
                              															</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth4Frame12}>
                          													<b className={styles.featuredDestinations}>Our Services</b>
                        												</div>
                        												<div className={styles.depth4Frame4}>
                          													<div className={styles.depth5Frame04}>
                            														<div className={styles.depth6Frame04} onClick={onDepth5FrameClick}>
                              															<img className={styles.depth7Frame05} alt="" src="/Figma_photoes/visa.svg" />
                              															<div className={styles.depth7Frame14}>
                                																<div className={styles.depth8Frame04}>
                                  																	<b className={styles.visaAssistance}>Visa Assistance</b>
                                																</div>
                                																<div className={styles.depth7Frame1}>
                                  																	<div className={styles.exploreLushTea}>Fast and reliable visa processing</div>
                                																</div>
                              															</div>
                            														</div>
                            														<div className={styles.depth6Frame04} onClick={onDepth5FrameClick}>
                              															<img className={styles.depth7Frame05} alt="" src="/Figma_photoes/tp.svg" />
                              															<div className={styles.depth7Frame14}>
                                																<div className={styles.depth8Frame04}>
                                  																	<b className={styles.visaAssistance}>Travel Planner</b>
                                																</div>
                                																<div className={styles.depth7Frame1}>
                                  																	<div className={styles.exploreLushTea}>Customize your perfect trip</div>
                                																</div>
                              															</div>
                            														</div>
                            														<div className={styles.depth6Frame04} onClick={onDepth5FrameClick}>
                              															<img className={styles.depth7Frame05} alt="" src="/Figma_photoes/em.svg" />
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
                        												<div className={styles.depth4Frame5}>
                          													<img className={styles.depth5Frame05} alt="" src="/Figma_photoes/chat.svg" />
                        												</div>
                      											</div>
                      											<div className={styles.depth6Frame31}>
                        												<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/bandorban.jpg" />
                        												<div className={styles.depth7Frame1}>
                          													<div className={styles.depth7Frame1}>
                            														<div className={styles.srimangal}>Bandarban</div>
                          													</div>
                          													<div className={styles.depth7Frame1}>
                            														<div className={styles.exploreLushTea}>Discover the Hills</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										{/* <div className={styles.depth2Frame3}>
                      											<div className={styles.depth3Frame02}>
                        												<div className={styles.depth4Frame03}>
                          													<div className={styles.depth5Frame06}>
                            														<div className={styles.depth6Frame05} onClick={() => navigate('/about-us')} style={{ cursor: 'pointer' }}>
                              															<div className={styles.aboutUs}>About Us</div>
                            														</div>
                            														<div className={styles.depth6Frame12} onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>
                              															<div className={styles.aboutUs}>Contact</div>
                            														</div>
                            														<div className={styles.depth6Frame05} onClick={() => navigate('/terms')} style={{ cursor: 'pointer' }}>
                              															<div className={styles.aboutUs}>Terms of Service</div>
                            														</div>
                            														<div className={styles.depth6Frame05} onClick={() => navigate('/PrivacyPolicy')} style={{ cursor: 'pointer' }}>
                              															<div className={styles.aboutUs}>Privacy Policy</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth5Frame12}>
                            														<img className={styles.depth6Frame06} alt="" src="/Figma_photoes/facebook.svg" />
                            														<img className={styles.depth6Frame06} alt="" src="/Figma_photoes/twitter.svg" />
                            														<img className={styles.depth6Frame06} alt="" src="/Figma_photoes/insta.svg" />
                          													</div>
                          													<div className={styles.depth5Frame22}>
                            														<div className={styles.aboutUs}>@2025 WanderNest, All rights reserved.</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div> */}
                  									</div>
                								</div>
              							</div>
            						</div>
          					</div>
          					</button>
							</Layout>
							);
          					};
          					
          					export default HomePage;
