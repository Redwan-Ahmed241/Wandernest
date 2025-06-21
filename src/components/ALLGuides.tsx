import { FunctionComponent, useCallback } from 'react';
import styles from './ALLguides.module.css';
import {useNavigate} from "react-router-dom";
import Layout from './Layout';
const AllGuides:FunctionComponent = () => {
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);

  	const navigate = useNavigate();

  	return (
		<Layout>
    		<div className={styles.allGuides}>
      			<div className={styles.localGuideParent}>
        				<div className={styles.localGuide}>
          					<div className={styles.depth0Frame0}>
            						<div className={styles.depth1Frame0}>
              							
              							<div className={styles.depth2Frame1}>
                								<div className={styles.depth3Frame01}>
                  									<div className={styles.depth4Frame02}>
                    										<div className={styles.depth5Frame02}>
                      											<div className={styles.depth6Frame02}>
                        												<div className={styles.depth7Frame0}>
                          													<div className={styles.depth8Frame0}>
                            														<div className={styles.exploreLocalTravel}>Explore Local Travel Guides</div>
                          													</div>
                          													<div className={styles.depth8Frame1}>
                            														<div className={styles.findTheBest}>Find the best guides for your next adventure with detailed information.</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth7Frame1} />
                        												<div className={styles.depth8Frame01}>
                          													<img className={styles.depth9Frame0} alt="" src="/Figma_photoes/search.svg" />
                          													<div className={styles.depth9Frame1}>
                            														<div className={styles.searchForGuides}>Search  for guides, destinations, or services</div>
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
                  									<div className={styles.depth4Frame12}>
                    										<b className={styles.availableTravelGuides}>Available Travel Guides</b>
                  									</div>
                  									<div className={styles.depth4Frame5} />
                  									<div className={styles.depth4Frame2}>
                    										<div className={styles.depth5Frame03} onClick={onDepth4FrameClick}>
                      											<img className={styles.depth6Frame03} alt="" src="/Figma_photoes/deer.jpg" />
                      											<div className={styles.depth6Frame1}>
                        												<div className={styles.depth7Frame01}>
                          													<b className={styles.guideForSundarban}>Guide for Sundarban Area</b>
                        												</div>
                        												<div className={styles.depth7Frame11}>
                          													<div className={styles.depth8Frame02}>
                            														<div className={styles.depth9Frame01}>
                              															<div className={styles.findTheBest}>Service Area: Forestr</div>
                            														</div>
                            														<div className={styles.depth9Frame11}>
                              															<div className={styles.findTheBest}>Fare: $50/hour | Timing: 9 AM - 6 PM</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth8Frame11}>
                            														<div className={styles.depth6Frame0}>
                              															<div className={styles.viewDetails}>View Details</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth4Frame2}>
                    										<div className={styles.depth5Frame04}>
                      											<img className={styles.depth6Frame03} alt="" src="/Figma_photoes/rangamati01-1.jpg" />
                      											<div className={styles.depth6Frame1}>
                        												<div className={styles.depth7Frame01}>
                          													<b className={styles.guideForSundarban}>Guide for Rangamati</b>
                        												</div>
                        												<div className={styles.depth7Frame11}>
                          													<div className={styles.depth8Frame02}>
                            														<div className={styles.depth9Frame03}>
                              															<div className={styles.findTheBest}>Service Area: Mountain Regions</div>
                            														</div>
                            														<div className={styles.depth9Frame01}>
                              															<div className={styles.findTheBest}>Fare: $60/hour | Timing: 8 AM - 4 PM</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth8Frame11}>
                            														<div className={styles.depth6Frame0}>
                              															<div className={styles.viewDetails}>View Details</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth4Frame2}>
                    										<div className={styles.depth5Frame04}>
                      											<img className={styles.depth6Frame03} alt="" src="/Figma_photoes/aboutUsHero.jpg" />
                      											<div className={styles.depth6Frame1}>
                        												<div className={styles.depth7Frame01}>
                          													<b className={styles.guideForSundarban}>Guide for Bandarban</b>
                        												</div>
                        												<div className={styles.depth7Frame11}>
                          													<div className={styles.depth8Frame02}>
                            														<div className={styles.depth9Frame03}>
                              															<div className={styles.findTheBest}>Service Area: Springs,Hills,Jungle</div>
                            														</div>
                            														<div className={styles.depth9Frame01}>
                              															<div className={styles.findTheBest}>Fare: $60/hour | Timing: 8 AM - 4 PM</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth8Frame11}>
                            														<div className={styles.depth6Frame0}>
                              															<div className={styles.viewDetails}>View Details</div>
                            														</div>
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
        				</div>
        			
      			</div>
    		</div>
			</Layout>);
};

export default AllGuides;
