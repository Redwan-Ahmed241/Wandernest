import { FunctionComponent, useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './PlanATrip.module.css';


const PlanATrip:FunctionComponent = () => {
  	const navigate = useNavigate();
  	 const [destinationQuery, setDestinationQuery] = useState('');



  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	
  	const onDepth7FrameClick = useCallback(() => {
    		navigate("/");
  	}, [navigate]);

  	const destinationSearch = () => {
    console.log('Search for Destinations:', destinationQuery);
    // Add your hotel search logic here (API call/filtering)
  };
  	return (
    		<div className={styles.planATrip}>
      			<div className={styles.profileWrapper}>
        				<div className={styles.profileWrapper}>
          					<div className={styles.profileWrapper}>
            						<div className={styles.profileWrapper}>
              							<div className={styles.profileDashboard2}>
                								<div className={styles.profileDashboard3}>
                  									<div className={styles.depth0Frame0}>
                    										<div className={styles.depth1Frame0}>
																<div className={styles.navbarWrapper}>
                      											<div className={styles.navbar}>
                        												<div className={styles.depth3Frame0}>
                          													<img className={styles.depth4Frame0} alt="" src="/Figma_photoes/wandernest.svg" />
                          													<div className={styles.depth4Frame1} onClick={onDepth4FrameClick}>
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
                              															<div className={styles.flights} onClick={onDepth4FrameClick}>Flights</div>
                            														</div>
                            														<div className={styles.depth4Frame1} onClick={onDepth4FrameClick}>
                              															<div className={styles.destinations}>Packages</div>
                            														</div>
                          													</div>
																						 <img 
            className={styles.depth4Frame14} 
            alt="Plan a Trip" 
            src="/Figma_photoes/ifty.jpg" 
            onClick={() => navigate('/plan-a-trip')}
            style={{ cursor: 'pointer' }}
          />
                        												</div>
																		</div>
                      											</div>
                      											<div className={styles.depth2Frame1}>
                        												<div className={styles.depth3Frame11}>
                          													<div className={styles.depth4Frame02}>
                            														<div className={styles.depth5Frame01}>
                              															<div className={styles.depth6Frame0}>
                                																<div className={styles.planYourTrip}>Plan Your Trip</div>
                              															</div>
                              															<div className={styles.depth6Frame1}>
                                																<div className={styles.useTheTrip}>Use the trip planner to create a personalized travel experience.</div>
                              															</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth4Frame11}>
                            														<div className={styles.depth5Frame02}>
                              															<div className={styles.depth6Frame01}>
                                															
                                																<div className={styles.depth7Frame1}>
                                  																	<div className={styles.searchForDestinations}>
																										<input
                      type="text"
                      value={destinationQuery}
                      onChange={(e) => setDestinationQuery(e.target.value)}
                      placeholder="Search hotels, rooms..."
                      className={styles.searchInput}
                    />
                    <button className={styles.searchButton} onClick={destinationSearch}>
                      Search
                    </button>
																									</div>
                                																</div>
                              															</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth4Frame2}>
                            														<div className={styles.depth5Frame03}>
                              															<div className={styles.depth6Frame02}>
                                																<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/arroww.svg" />
                                																<div className={styles.depth7Frame11}>
                                  																	<b className={styles.activitySundarbansForest}>May 2025</b>
                                																</div>
                              															</div>
                              															<div className={styles.depth6Frame11}>
                                																<div className={styles.depth7Frame02}>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>S</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>M</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>T</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>W</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>T</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>F</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>S</b>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>1</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>2</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>3</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>4</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame41}>
                                    																		<div className={styles.depth9Frame04}>
                                      																			<div className={styles.div}>5</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>6</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>7</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>8</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>9</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>10</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>11</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>12</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>13</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>14</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>15</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>16</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>17</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>18</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>19</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>20</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>21</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>22</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>23</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>24</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>25</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>26</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>27</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>28</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>29</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>30</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                              															</div>
                            														</div>
                            														<div className={styles.depth5Frame03}>
                              															<div className={styles.depth6Frame02}>
                                																<div className={styles.depth7Frame03}>
                                  																	<b className={styles.activitySundarbansForest}>June 2025</b>
                                																</div>
                                																<img className={styles.depth7Frame01} alt="" src="/Figma_photoes/side_arrow.svg" />
                              															</div>
                              															<div className={styles.depth6Frame11}>
                                																<div className={styles.depth7Frame02}>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>S</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>M</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>T</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>W</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>T</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>F</b>
                                  																	</div>
                                  																	<div className={styles.depth8Frame0}>
                                    																		<b className={styles.s}>S</b>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>1</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>2</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>3</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>4</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>5</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame51}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>6</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame66}>
                                    																		<div className={styles.depth9Frame04}>
                                      																			<div className={styles.div}>7</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>8</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>9</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>10</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>11</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>12</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>13</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>14</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>15</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>16</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>17</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>18</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>19</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>20</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>21</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>22</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>23</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>24</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>25</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>26</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>27</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>28</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth7Frame12}>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>29</div>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth8Frame01}>
                                    																		<div className={styles.depth9Frame0}>
                                      																			<div className={styles.div}>30</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                              															</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth4Frame3}>
                            														<img className={styles.depth5Frame04} alt="" src="/Figma_photoes/f2d.svg" />
                            														<div className={styles.depth5Frame12}>
                              															<div className={styles.depth6Frame04}>
                                																<div className={styles.flightToDhaka}>Flight to Dhaka</div>
                              															</div>
                              															<div className={styles.depth6Frame13}>
                                																<div className={styles.am}>8:00 AM</div>
                              															</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth4Frame3}>
                            														<img className={styles.depth5Frame04} alt="" src="/Figma_photoes/checkin.svg" />
                            														<div className={styles.depth5Frame12}>
                              															<div className={styles.depth6Frame04}>
                                																<div className={styles.flightToDhaka}>Check-in to Hotel Dhaka</div>
                              															</div>
                              															<div className={styles.depth6Frame14}>
                                																<div className={styles.am}>10:00 AM</div>
                              															</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth4Frame3}>
                            														<img className={styles.depth5Frame04} alt="" src="/Figma_photoes/location.svg" />
                            														<div className={styles.depth5Frame12}>
                              															<div className={styles.depth6Frame04}>
                                																<div className={styles.flightToDhaka}>Visit Cox's Bazar Beach</div>
                                																</div>
                                																<div className={styles.depth6Frame15}>
                                  																	<div className={styles.am}>2:00 PM</div>
                                																</div>
                              															</div>
                            														</div>
                            														<div className={styles.depth4Frame3}>
                              															<img className={styles.depth5Frame04} alt="" src="/Figma_photoes/island.svg" />
                              															<div className={styles.depth5Frame12}>
                                																<div className={styles.depth6Frame04}>
                                  																	<div className={styles.flightToDhaka}>St. Martin's Island Trip</div>
                                  																	</div>
                                  																	<div className={styles.depth6Frame16}>
                                    																		<div className={styles.am}>6:00 PM</div>
                                  																	</div>
                                																</div>
                              															</div>
                              															<div className={styles.depth4Frame3}>
                                																<img className={styles.depth5Frame04} alt="" src="/Figma_photoes/dinner.svg" />
                                																<div className={styles.depth5Frame12}>
                                  																	<div className={styles.depth6Frame04}>
                                    																		<div className={styles.flightToDhaka}>Dinner at Pan Pacific Sonargaon</div>
                                  																	</div>
                                  																	<div className={styles.depth6Frame17}>
                                    																		<div className={styles.am}>9:00 PM</div>
                                  																	</div>
                                																</div>
                              															</div>
                              															<div className={styles.depth4Frame8}>
                                																<div className={styles.depth5Frame09}>
                                  																	<div className={styles.depth6Frame09}>
                                    																		<div className={styles.depth7Frame05}>
                                      																			<div className={styles.depth8Frame012}>
                                        																				<b className={styles.activitySundarbansForest}>Activity: Sundarbans Forest</b>
                                      																			</div>
                                      																			<div className={styles.depth8Frame112}>
                                        																				<div className={styles.am}>Explore the mangrove forest and spot Bengal tigers.</div>
                                      																			</div>
                                    																		</div>
                                    																		<div className={styles.depth7Frame15}>
                                      																			<div className={styles.depth8Frame013} onClick={() => navigate("/edit")}>
                                        																				<div className={styles.edit}>Edit</div>
                                      																			</div>
                                    																		</div>
                                  																	</div>
                                  																	<img className={styles.depth6Frame18} alt="" src="/Figma_photoes/deer.jpg" />
                                																</div>
                              															</div>
                              															<div className={styles.depth4Frame8}>
                                																<div className={styles.depth5Frame09}>
                                  																	<div className={styles.depth6Frame09}>
                                    																		<div className={styles.depth7Frame05}>
                                      																			<div className={styles.depth8Frame012}>
                                        																				<b className={styles.activitySundarbansForest}>Hotel Stay: Hotel Dhaka</b>
                                      																			</div>
                                      																			<div className={styles.depth8Frame112}>
                                        																				<div className={styles.am}>Enjoy a luxurious stay in the capital city.</div>
                                      																			</div>
                                    																		</div>
                                    																		<div className={styles.depth7Frame15}>
                                      																			<div className={styles.depth8Frame013} onClick={() => navigate("/edit")}>
                                        																				<div className={styles.edit}>Edit</div>
                                      																			</div>
                                    																		</div>
                                  																	</div>
                                  																	<img className={styles.depth6Frame18} alt="" src="/Figma_photoes/city_center_hotel.png" />
                                																</div>
                              															</div>
                              															<div className={styles.depth4Frame8}>
                                																<div className={styles.depth5Frame09}>
                                  																	<div className={styles.depth6Frame09}>
                                    																		<div className={styles.depth7Frame05}>
                                      																			<div className={styles.depth8Frame012}>
                                        																				<b className={styles.activitySundarbansForest}>Transportation: Rickshaw</b>
                                      																			</div>
                                      																			<div className={styles.depth8Frame112}>
                                        																				<div className={styles.am}>Experience the local mode of transportation.</div>
                                      																			</div>
                                    																		</div>
                                    																		<div className={styles.depth7Frame15}>
                                      																			<div className={styles.depth8Frame013}onClick={() => navigate("/edit")}>
                                        																				<div className={styles.edit}>Edit</div>
                                      																			</div>
                                    																		</div>
                                  																	</div>
                                  																	<img className={styles.depth6Frame110} alt="" src="/Figma_photoes/rickshaw.jpg" />
                                																</div>
                              															</div>
                              															<div className={styles.depth4Frame111}>
                                																<div className={styles.depth4Frame21}>
                                  																	<div className={styles.depth5Frame012}>
                                    																		<div className={styles.depth6Frame012}>
                                      																			<div className={styles.travelNotes}>Travel Notes</div>
                                    																		</div>
                                  																	</div>
                                																</div>
                                																<div className={styles.depth4Frame11Child} />
                              															</div>
                              															<div className={styles.depth4Frame12}>
                                																<div className={styles.depth5Frame013}>
                                  																	<div className={styles.depth6Frame013}>
                                    																		<div className={styles.depth8Frame013}onClick={() => navigate("/edit")}>
                                      																			<b className={styles.autoGeneratePlan}>Auto-Generate Plan</b>
                                    																		</div>
                                  																	</div>
                                  																	<div className={styles.depth6Frame111}>
                                    																		<div className={styles.depth8Frame013}onClick={() => navigate("/add")}>
                                      																			<b className={styles.autoGeneratePlan}>Add Activity</b>
                                    																		</div>
                                  																	</div>
                                																</div>
                              															</div>
                              															<div className={styles.depth4Frame8}>
                                																<div className={styles.depth5Frame014}>
                                  																	<div className={styles.depth6Frame09}>
                                    																		<div className={styles.depth7Frame05}>
                                      																			<div className={styles.depth8Frame012}>
                                        																				<b className={styles.activitySundarbansForest}>AI Suggested Itinerary</b>
                                      																			</div>
                                      																			<div className={styles.depth8Frame112}>
                                        																				<div className={styles.am}>Trip to Sylhet</div>
                                      																			</div>
                                    																		</div>
                                    																		<div className={styles.depth7Frame18}>
                                      																			<div className={styles.depth8Frame013}onClick={() => navigate("/edit")}>
                                        																				<div className={styles.edit}>Add to Plan</div>
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
                    										<div className={styles.dashboardComponent}>
                      											<div className={styles.depth5Frame17}>
                        												<div className={styles.depth6Frame015}>
                          													<img className={styles.depth7Frame011} alt="" src="/Figma_photoes/ifty.jpg" />
                          													<div className={styles.depth5Frame2}>
                            														<div className={styles.depth8Frame020}>
                              															<div className={styles.travelNotes}>Iftakhar Majumder</div>
                            														</div>
                            														<div className={styles.depth8Frame116}>
                              															<div className={styles.planYourNext}>Plan your next adventure</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth6Frame112}>
                          													<div className={styles.depth7Frame012} onClick={() => navigate('/homepage')}>
                            														<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/home.svg" />
                            														<div className={styles.depth5Frame2}>
                              															<div className={styles.destinations}>Home</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth7Frame012} onClick={onDepth4FrameClick}>
                            														<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/home.svg" />
                            														<div className={styles.depth5Frame2}>
                              															<div className={styles.destinations}>My Trips</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth7Frame012} onClick={onDepth4FrameClick}>
                            														<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/explore.svg" />
                            														<div className={styles.depth5Frame2}>
                              															<div className={styles.destinations}>Explore</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth7Frame32} onClick={onDepth7FrameClick}>
                            														<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/plan.svg" />
                            														<div className={styles.depth5Frame2}>
                              															<div className={styles.destinations}>Plan a Trip</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth7Frame012} onClick={() => navigate('/flights')}>
                            														<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/flight.svg" />
                            														<div className={styles.depth5Frame2}>
                              															<div className={styles.destinations}>Flights</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth7Frame012} onClick={() => navigate('/hotels-rooms')}>
                            														<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/hotel.svg" />
                            														<div className={styles.depth5Frame2}>
                              															<div className={styles.destinations}>Hotels</div>
                            														</div>
                          													</div>
                          													<div className={styles.depth7Frame012} onClick={() => navigate('/rent-vehicles')}>
                            														<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/car.svg" />
                            														<div className={styles.depth5Frame2}>
                              															<div className={styles.destinations}>Cars</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth7Frame7} onClick={onDepth4FrameClick}>
                          													<img className={styles.depth8Frame210} alt="" src="/Figma_photoes/gift.svg" />
                          													<div className={styles.depth5Frame2}>
                            														<div className={styles.destinations}>Gift Cards</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
                								<img className={styles.depth4Frame14} alt="" src="Depth 4, Frame 1.png" />
              							</div>
            						</div>
          					</div>
          					<div className={styles.depth2Frame4}>
            						<div className={styles.depth3Frame01}>
              							<div className={styles.depth4Frame03}>
                								<div className={styles.depth5Frame015}>
                  									<div className={styles.depth6Frame016} onClick={onDepth4FrameClick}>
                    										<div className={styles.aboutUs}>About Us</div>
                  									</div>
                  									<div className={styles.depth6Frame113} onClick={() => navigate('/contact')}>
                    										<div className={styles.aboutUs}>Contact</div>
                  									</div>
                  									<div className={styles.depth6Frame016} onClick={onDepth4FrameClick}>
                    										<div className={styles.aboutUs}>Terms of Service</div>
                  									</div>
                  									<div className={styles.depth6Frame016} onClick={onDepth4FrameClick}>
                    										<div className={styles.aboutUs}>Privacy Policy</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame18}>
                  									<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/facebook.svg" />
                  									<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/twitter.svg" />
                  									<img className={styles.depth8Frame021} alt="" src="/Figma_photoes/insta.svg" />
                								</div>
                								<div className={styles.depth5Frame21}>
                  									<div className={styles.aboutUs}>@2025 WanderNest, All rights reserved.</div>
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>);
        				};
        				
        				export default PlanATrip;
        				