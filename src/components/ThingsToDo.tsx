import React, { useState } from 'react';
import { FunctionComponent } from 'react';
import styles from './ThingsToDo.module.css';
import { useNavigate } from 'react-router-dom';

const ThingsToDo: FunctionComponent = () => {
  const [activityQuery, setActivityQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
 const navigate = useNavigate(); 

  const handleActivitySearch = () => {
    console.log('Searching for activities:', activityQuery);
    // Add your search logic here (API call/filtering)
  };

  const handleLocationSearch = () => {
    console.log('Searching in location:', locationQuery);
    // Add your search logic here
  };

  const onDepth4FrameClick = () => {
    // Handle navigation if needed
  };
 


  	return (
    		<div className={styles.thingsToDo}>
      			<div className={styles.depth0Frame0}>
        				<div className={styles.depth1Frame0}>
          					<div className={styles.depth2Frame0}>
            						<div className={styles.depth3Frame0}>
              							<div className={styles.depth4Frame0} onClick={onDepth4FrameClick}>
                								<img className={styles.depth5Frame0} alt="" src="/Figma_photoes/wandernest.svg" />
                								<div className={styles.depth5Frame1}>
                  									<b className={styles.wandernest}>WanderNest</b>
                								</div>
              							</div>
              							<div className={styles.depth4Frame1}>
                								<div className={styles.depth5Frame01} onClick={onDepth4FrameClick}>
                  									<div className={styles.stay}>Stay</div>
                								</div>
                								<div className={styles.depth5Frame01} onClick={onDepth4FrameClick}>
                  									<div className={styles.stay}>Eat</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.depth3Frame1}>
              							<div className={styles.depth4Frame01}>
                								<div className={styles.depth5Frame01} onClick={() => navigate('/destinations')}>
  <div className={styles.stay}>Destinations</div>
</div>
                								<div className={styles.depth5Frame01} onClick={() => navigate('/hotels-rooms')}>
                  									<div className={styles.stay}>Hotels</div>
                								</div>
                								<div className={styles.depth5Frame1}>
                  									<div className={styles.flights} onClick={onDepth4FrameClick}>Flights</div>
                								</div>
                								<div className={styles.depth5Frame01} onClick={onDepth4FrameClick}>
                  									<div className={styles.stay}>Packages</div>
                								</div>
              							</div>
              							 <img 
            className={styles.depth5Frame21} 
            alt="Plan a Trip" 
            src="/Figma_photoes/ifty.jpg" 
            onClick={() => navigate('/plan-a-trip')}
            style={{ cursor: 'pointer' }}
          />
            						</div>
          					</div>
          					<div className={styles.depth2Frame1}>
            						<div className={styles.depth3Frame01}>
              							<div className={styles.depth4Frame02}>
                								<b className={styles.thingsToDo1}>Things to do</b>
              							</div>
              							    <div className={styles.depth4Frame12}>
         {/* Search for Activities */}
<div className={styles.depth4Frame12}>
  <div className={styles.searchLabel}>Search for activities</div>
  <div className={styles.searchContainer}>
    <input
      type="text"
      value={activityQuery}
      onChange={(e) => setActivityQuery(e.target.value)}
      placeholder="e.g., hiking, museums"
      className={styles.searchInput}
    />
    <button className={styles.searchButton} onClick={handleActivitySearch}>
      Search
    </button>
  </div>
</div>

{/* Search for Locations */}
<div className={styles.depth4Frame12}>
  <div className={styles.searchLabel}>Select location</div>
  <div className={styles.searchContainer}>
    <input
      type="text"
      value={locationQuery}
      onChange={(e) => setLocationQuery(e.target.value)}
      placeholder="e.g., Dhaka, Cox's Bazar"
      className={styles.searchInput}
    />
    <button className={styles.searchButton} onClick={handleLocationSearch}>
      Search
    </button>
  </div>
</div>    </div>
              							<div className={styles.depth4Frame5}>
                								<div className={styles.depth5Frame05}>
                  									<div className={styles.depth6Frame02}>
                    										<div className={styles.nature}>Nature</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame05}>
                  									<div className={styles.depth6Frame02}>
                    										<div className={styles.stay}>Food</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame05}>
                  									<div className={styles.depth6Frame02}>
                    										<div className={styles.stay}>Culture</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame05}>
                  									<div className={styles.depth6Frame02}>
                    										<div className={styles.stay}>Adventure</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame4}>
                  									<div className={styles.depth6Frame02}>
                    										<div className={styles.stay}>All</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame4}>
                								<div className={styles.depth5Frame06}>
                  									<div className={styles.depth6Frame07}>
                    										<img className={styles.depth7Frame0} alt="" src="/Figma_photoes/mangrove.jpg" />
                    										<div className={styles.depth7Frame1}>
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.searchForActivities}>Explore the Sundarbans Mangrove Forest</div>
                      											</div>
                      											<div className={styles.depth8Frame1}>
                        												<div className={styles.immerseYourselfIn}>Immerse yourself in the lush green beauty of the Sundarbans, the world's largest mangrove forest. Capture stunning photos of diverse flora and fauna, and experience nature's tranquil essence.</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame07}>
                    										<img className={styles.depth7Frame2} alt="" src="/Figma_photoes/puran_dhaka.jpg" />
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.searchForActivities}>Savor Street Food in Old Dhaka</div>
                      											</div>
                      											<div className={styles.depth8Frame1}>
                        												<div className={styles.immerseYourselfIn}>Indulge in a culinary adventure through the vibrant streets of Old Dhaka. Sample local delicacies like biryani, kebabs, and flavorful chutneys.</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame07}>
                    										<img className={styles.depth7Frame2} alt="" src="/Figma_photoes/lalbagh.jpg" />
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.searchForActivities}>Discover Historical Sites at Lalbagh Fort</div>
                      											</div>
                      											<div className={styles.depth8Frame1}>
                        												<div className={styles.immerseYourselfIn}>Journey through time within the ancient walls of Lalbagh Fort, a historical Mughal-era structure. Marvel at intricate architecture, gardens, and artifacts.</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame07}>
                    										<img className={styles.depth7Frame2} alt="" src="/Figma_photoes/burigangha.jpg" />
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.searchForActivities}>Boat Trip on the Buriganga River</div>
                      											</div>
                      											<div className={styles.depth8Frame1}>
                        												<div className={styles.immerseYourselfIn}>Take a scenic boat trip on the Buriganga River, offering captivating views of Dhaka's cityscape. Experience the hustle and bustle of river life.</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame07}>
                      											<img className={styles.depth7Frame2} alt="" src="/Figma_photoes/coxsbazar.jpg" />
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.depth1Frame0}>
                          													<div className={styles.searchForActivities}>Relax at Cox's Bazar Beach</div>
                          													</div>
                          													<div className={styles.depth8Frame1}>
                            														<div className={styles.immerseYourselfIn}>Find peace and rejuvenation on the golden sands of Cox's Bazar, one of the world's longest natural beaches. Relax by the sea, and soak in the coastal atmosphere.</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth5Frame06}>
                      											<div className={styles.depth6Frame07}>
                        												<img className={styles.depth7Frame2} alt="" src="/Figma_photoes/local_cuisine.jpeg" />
                        												<div className={styles.depth1Frame0}>
                          													<div className={styles.depth1Frame0}>
                            														<div className={styles.searchForActivities}>Experience Traditional Cuisine in a Local Eatery</div>
                          													</div>
                          													<div className={styles.depth8Frame1}>
                            														<div className={styles.immerseYourselfIn}>Treat yourself to a delightful culinary adventure in a traditional Bangladeshi eatery. Relish the rich flavors of local dishes like hilsa fish curry and various vegetable preparations.</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.depth6Frame07}>
                        												<img className={styles.depth7Frame2} alt="" src="/Figma_photoes/museum.jpeg" />
                        												<div className={styles.depth1Frame0}>
                          													<div className={styles.depth1Frame0}>
                            														<div className={styles.searchForActivities}>Visit the National Museum of Bangladesh</div>
                          													</div>
                          													<div className={styles.depth8Frame1}>
                            														<div className={styles.immerseYourselfIn}>Step into the cultural heritage of Bangladesh at the National Museum in Dhaka. Wander through exhibits showcasing art, history, and the nation's rich past.</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className={styles.depth6Frame07}>
                          													<img className={styles.depth7Frame2} alt="" src="/Figma_photoes/cycling.jpg" />
                          													<div className={styles.depth1Frame0}>
                            														<div className={styles.depth1Frame0}>
                              															<div className={styles.searchForActivities}>Cycle through the Countryside</div>
                            														</div>
                            														<div className={styles.depth8Frame1}>
                              															<div className={styles.immerseYourselfIn}>Embark on a picturesque cycling tour through the serene countryside surrounding Dhaka. Witness rural life, lush green fields, and local villages as you ride.</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.depth2Frame4}>
              							<div className={styles.depth3Frame02}>
                								<div className={styles.depth4Frame03}>
                  									<div className={styles.depth5Frame07}>
                    										<div className={styles.depth6Frame09} onClick={() => navigate('/about-us')}>
                      											<div className={styles.aboutUs}>About Us</div>
                    										</div>
                    										<div className={styles.depth6Frame09} onClick={() => navigate('/contact')}>
                      											<div className={styles.aboutUs}>Contact</div>
                    										</div>
                    										<div className={styles.depth6Frame09} onClick={() => navigate('/terms-of-service')}>
                      											<div className={styles.aboutUs}>Terms of Service</div>
                    										</div>
                    										<div className={styles.depth6Frame09} onClick={() => navigate('/privacy-policy')}>
                      											<div className={styles.aboutUs}>Privacy Policy</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame15}>
                    										<img className={styles.depth6Frame010} alt="" src="/Figma_photoes/facebook.svg"
															 onClick={() => window.open("https://www.facebook.com/yourwandernestpage", "_blank")} />
                    										<img className={styles.depth6Frame010} alt="" src="/Figma_photoes/twitter.svg" 
															 onClick={() => window.open("https://www.x.com/yourwandernestpage", "_blank")}/>
                    										<img className={styles.depth6Frame010} alt="" src="/Figma_photoes/insta.svg" 
															 onClick={() => window.open("https://www.instagram.com/yourwandernestpage", "_blank")}/>
                  									</div>
                  									<div className={styles.depth5Frame22}>
                    										<div className={styles.aboutUs}>@2025 WanderNest, All rights reserved.</div>
                  									</div>
                								</div>
              							</div>
            						</div>
          					</div>);
          					};
          					
          					export default ThingsToDo;
          					