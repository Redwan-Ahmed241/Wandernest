import { FunctionComponent, useCallback } from 'react';
import styles from './ALLguides.module.css';
import {useNavigate} from "react-router-dom";

const AllGuides:FunctionComponent = () => {
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);

  	const navigate = useNavigate();

  	return (
    		<div className={styles.allGuides}>
      			<div className={styles.localGuideParent}>
        				<div className={styles.localGuide}>
          					<div className={styles.depth0Frame0}>
            						<div className={styles.depth1Frame0}>
              							<div className={styles.navbar}>
                								<div className={styles.depth3Frame0}>
                  									<img className={styles.depth4Frame0} alt="" src="/Figma_photoes/wandernest.svg" />
                  									<div className={styles.depth4Frame1} onClick={onDepth4FrameClick}>
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
                    										<div className={styles.depth4Frame1} onClick={onDepth4FrameClick}>
                      											<div className={styles.flights} onClick={onDepth4FrameClick}>Flights</div>
                    										</div>
                    										<div className={styles.depth4Frame1} onClick={onDepth4FrameClick}>
                      											<div className={styles.flights} onClick={onDepth4FrameClick}>Packages</div>
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
                    										<img className={styles.depth5Frame21} alt="" src="/Figma_photoes/world.svg" />
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
        				<div className={styles.footer} onClick={onDepth4FrameClick}>
          					<div className={styles.depth5Frame06}>
            						<div className={styles.depth6Frame06}>
              							<div className={styles.findTheBest}>About Us</div>
            						</div>
            						<div className={styles.depth6Frame06}>
              							<div className={styles.findTheBest}>Contact</div>
            						</div>
            						<div className={styles.depth6Frame06}>
              							<div className={styles.findTheBest}>Terms of Service</div>
            						</div>
            						<div className={styles.depth6Frame06}>
              							<div className={styles.findTheBest}>Privacy Policy</div>
            						</div>
          					</div>
          					<div className={styles.depth5Frame12}>
            						<img className={styles.depth6Frame07} alt="" src="/Figma_photoes/facebook.svg" />
            						<img className={styles.depth6Frame07} alt="" src="/Figma_photoes/twitter.svg" />
            						<img className={styles.depth6Frame07} alt="" src="/Figma_photoes/insta.svg" />
          					</div>
          					<div className={styles.depth5Frame22}>
            						<div className={styles.findTheBest}>@2025 WanderNest, All rights reserved.</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default AllGuides;
