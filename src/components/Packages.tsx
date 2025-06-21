import { FunctionComponent, useCallback } from 'react';
import {useNavigate} from "react-router-dom";
import styles from './Packages.module.css';


const Packages:FunctionComponent = () => {
  	const navigate = useNavigate();
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	
  	const onDepth5FrameClick = useCallback(() => {
    		navigate("/tour-packages");
  	}, [navigate]);
  	
  	return (
    		<div className={styles.packages}>
      			<div className={styles.tourPackagesWrapper}>
        				<div className={styles.tourPackages}>
          					<div className={styles.tourPackages1}>
            						<div className={styles.depth0Frame0}>
              							<div className={styles.footer} />
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
                          													<div className={styles.flights} onClick={() => navigate('/flights')}>
                          														Flights
                          													</div>
                        												</div>
                        												<div className={styles.depth4Frame1} onClick={() => navigate('/packages')}>
                          													<div className={styles.destinations}>Packages</div>
                        												</div>
                      											</div>
                      											<div className={styles.depth4Frame11}>
                        												<div className={styles.depth5Frame01} onClick={() => navigate('/sign-up')}>
                          													<div className={styles.depth6Frame0}>
                            														<b className={styles.signUp}>Sign up</b>
                          													</div>
                        												</div>
                        												<div className={styles.depth5Frame11} onClick={() => navigate('/login')}>
                          													<div className={styles.depth6Frame0}>
                            														<b className={styles.signUp}>Log in</b>
                          													</div>
                        												</div>
                        												<img className={styles.depth5Frame21} alt=""src="/Figma_photoes/world.svg" />
                      											</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth2Frame1}>
                  									<div className={styles.depth3Frame01}>
                    										<div className={styles.depth4Frame02}>
                      											<div className={styles.depth5Frame02}>
                        												<div className={styles.depth6Frame02}>
                          													<img className={styles.depth7Frame0} alt="" src="/Figma_photoes/search.svg" />
                          													<div className={styles.depth7Frame1}>
                            														<div className={styles.searchDestinations}>Search  destinations</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.groupParent}>
                      											<div className={styles.rectangleParent}>
                        												<div className={styles.groupChild} />
                        												<b className={styles.createCustomPackage}>Create custom package</b>
                      											</div>
                      											<b className={styles.tourPackages2}>Tour Packages</b>
                    										</div>
                    										<div className={styles.depth4Frame2}>
                      											<div className={styles.depth5Frame03}>
                        												<div className={styles.depth6Frame03}>
                          													<div className={styles.destinations}>Destination</div>
                        												</div>
                        												<img className={styles.depth6Frame1} alt="" src="/Figma_photoes/darrow.svg" />
                      											</div>
                      											<div className={styles.depth5Frame03}>
                        												<div className={styles.depth6Frame03}>
                          													<div className={styles.destinations}>Duration</div>
                        												</div>
                        												<img className={styles.depth6Frame1} alt="" src="/Figma_photoes/darrow.svg" />
                      											</div>
                      											<div className={styles.depth5Frame03}>
                        												<div className={styles.depth6Frame03}>
                          													<div className={styles.destinations}>Budget</div>
                        												</div>
                        												<img className={styles.depth6Frame1} alt="" src="/Figma_photoes/darrow.svg" />
                      											</div>
                      											<div className={styles.depth5Frame03}>
                        												<div className={styles.depth6Frame03}>
                          													<div className={styles.destinations}>Activity</div>
                        												</div>
                        												<img className={styles.depth6Frame1} alt="" src="/Figma_photoes/darrow.svg" />
                      											</div>
                    										</div>
                    										<div className={styles.depth4Frame3}>
                      											<div className={styles.depth5Frame04}>
                        												<div className={styles.depth6Frame07}>
                          													<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/sundarban.jpg" />
                          													<div className={styles.depth7Frame11}>
                            														<div className={styles.depth7Frame11}>
                              															<div className={styles.sundarbansWildlifeExpedition}>Sundarbans Wildlife Expedition</div>
                            														</div>
                            														<div className={styles.depth8Frame1}>
                              															<div className={styles.exploreTheWorlds}>Explore the world’s largest mangrove forest, home to the Royal Bengal Tiger. $250/person</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth6Frame07}>
                          													<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/coxsbazar.jpg" />
                          													<div className={styles.depth7Frame11}>
                            														<div className={styles.depth7Frame11}>
                              															<div className={styles.sundarbansWildlifeExpedition}>Cox’s Bazar Beach Retreat</div>
                            														</div>
                            														<div className={styles.depth8Frame1}>
                              															<div className={styles.exploreTheWorlds}>Relax on the world’s longest natural sea beach with golden sands. $150/person</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth6Frame07}>
                          													<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/srimangal.png" />
                          													<div className={styles.depth7Frame11}>
                            														<div className={styles.depth7Frame11}>
                              															<div className={styles.sundarbansWildlifeExpedition}>{`Sylhet Tea Garden & Hill Trek`}</div>
                            														</div>
                            														<div className={styles.depth8Frame1}>
                              															<div className={styles.exploreTheWorlds}>Discover lush tea gardens, rolling hills, and indigenous tribal cultures. $300/person</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth6Frame07}>
                          													<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/dh-hs.jpg" />
                          													<div className={styles.depth7Frame11}>
                            														<div className={styles.depth7Frame11}>
                              															<div className={styles.sundarbansWildlifeExpedition}>{`Dhaka Historical & Cultural Tour`}</div>
                            														</div>
                            														<div className={styles.depth8Frame1}>
                              															<div className={styles.exploreTheWorlds}>Immerse yourself in the rich history and vibrant culture of Bangladesh’s capital. $200/person</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth6Frame07}>
                          													<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/bandorban.jpg" />
                          													<div className={styles.depth7Frame11}>
                            														<div className={styles.depth7Frame11}>
                              															<div className={styles.sundarbansWildlifeExpedition}>Chittagong Hill Tracts Adventure</div>
                            														</div>
                            														<div className={styles.depth8Frame1}>
                              															<div className={styles.exploreTheWorlds}>Embark on an adventurous journey through breathtaking landscapes and remote villages. $350/person</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.depth5Frame13}>
                        												<div className={styles.depth6Frame08}>
                          													<img className={styles.depth7Frame05} alt="" src="/Figma_photoes/Saint-Martin.jpg" />
                          													<div className={styles.depth7Frame11}>
                            														<div className={styles.depth7Frame11}>
                              															<div className={styles.sundarbansWildlifeExpedition}>St. Martin’s Island Escape</div>
                            														</div>
                            														<div className={styles.depth8Frame1}>
                              															<div className={styles.exploreTheWorlds}>Unwind on the only coral island of Bangladesh, surrounded by crystal-clear waters. $180/person</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<img className={styles.depth5Frame05} alt="" src="/Figma_photoes/chat.svg" />
              							<div className={styles.depth2Frame3}>
                								<div className={styles.depth3Frame02}>
                  									<div className={styles.depth4Frame03}>
                    										<div className={styles.depth5Frame06}>
                      											<div className={styles.depth6Frame09} onClick={onDepth4FrameClick}>
                        												<div className={styles.aboutUs}>About Us</div>
                      											</div>
                      											<div className={styles.depth6Frame15}>
                        												<div className={styles.aboutUs}>Contact</div>
                      											</div>
                      											<div className={styles.depth6Frame09} onClick={onDepth4FrameClick}>
                        												<div className={styles.aboutUs}>Terms of Service</div>
                      											</div>
                      											<div className={styles.depth6Frame09} onClick={onDepth4FrameClick}>
                        												<div className={styles.aboutUs}>Privacy Policy</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth5Frame14}>
                      											<img className={styles.depth6Frame010} alt="" src="/Figma_photoes/facebook.svg" />
                      											<img className={styles.depth6Frame010} alt="" src="/Figma_photoes/twitter.svg" />
                      											<img className={styles.depth6Frame010} alt="" src="/Figma_photoes/insta.svg" />
                    										</div>
                    										<div className={styles.depth5Frame23}>
                      											<div className={styles.aboutUs}>@2025 WanderNest, All rights reserved.</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default Packages;
