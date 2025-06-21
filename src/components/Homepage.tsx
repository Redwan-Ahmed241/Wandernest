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
