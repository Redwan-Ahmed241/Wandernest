import { FunctionComponent, useCallback } from 'react';
import styles from './MyTrips.module.css';


const MyTrips:FunctionComponent = () => {
  	
  	const onDepth5FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.myTrips}>
      			<div className={styles.myTrips1}>
        				<div className={styles.depth1Frame0}>
          					<div className={styles.depth2Frame0}>
            						<div className={styles.depth3Frame0}>
              							<img className={styles.depth4Frame0} alt="" src="Depth 4, Frame 0.svg" />
              							<div className={styles.depth4Frame1}>
                								<b className={styles.wandernest}>WanderNest</b>
              							</div>
            						</div>
            						<div className={styles.depth3Frame1}>
              							<div className={styles.depth4Frame2}>
                								<div className={styles.depth5Frame0} onClick={onDepth5FrameClick}>
                  									<div className={styles.destinations}>Destinations</div>
                								</div>
                								<div className={styles.depth5Frame0} onClick={onDepth5FrameClick}>
                  									<div className={styles.destinations}>Hotels</div>
                								</div>
                								<div className={styles.depth4Frame1}>
                  									<div className={styles.flights} onClick={onDepth5FrameClick}>Flights</div>
                								</div>
                								<div className={styles.depth5Frame0} onClick={onDepth5FrameClick}>
                  									<div className={styles.destinations}>Packages</div>
                								</div>
              							</div>
              							<img className={styles.depth4Frame11} alt="" src="Depth 4, Frame 1.png" />
            						</div>
          					</div>
          					<div className={styles.depth2Frame1}>
            						<div className={styles.dashboardComponent}>
              							<div className={styles.depth5Frame11}>
                								<div className={styles.depth6Frame0}>
                  									<img className={styles.depth4Frame11} alt="" src="Depth 7, Frame 0.png" />
                  									<div className={styles.depth4Frame1}>
                    										<div className={styles.depth8Frame0}>
                      											<div className={styles.iftakharMajumder}>Iftakhar Majumder</div>
                    										</div>
                    										<div className={styles.depth8Frame1}>
                      											<div className={styles.planYourNext}>Plan your next adventure</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth6Frame1}>
                  									<div className={styles.depth7Frame01} onClick={onDepth5FrameClick}>
                    										<img className={styles.depth8Frame01} alt="" src="Depth 8, Frame 0.svg" />
                    										<div className={styles.depth4Frame1}>
                      											<div className={styles.destinations}>Home</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth7Frame11}>
                    										<img className={styles.depth8Frame01} alt="" src="Depth 8, Frame 0.svg" />
                    										<div className={styles.depth4Frame1}>
                      											<div className={styles.destinations}>My Trips</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth7Frame2} onClick={onDepth5FrameClick}>
                    										<img className={styles.depth8Frame01} alt="" src="Depth 8, Frame 0.svg" />
                    										<div className={styles.depth4Frame1}>
                      											<div className={styles.destinations}>Explore</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth7Frame3} onClick={onDepth5FrameClick}>
                    										<img className={styles.depth8Frame01} alt="" src="Depth 8, Frame 0.svg" />
                    										<div className={styles.depth4Frame1}>
                      											<div className={styles.destinations}>Plan a Trip</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth7Frame01} onClick={onDepth5FrameClick}>
                    										<img className={styles.depth8Frame01} alt="" src="Depth 8, Frame 0.svg" />
                    										<div className={styles.depth4Frame1}>
                      											<div className={styles.destinations}>Flights</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth7Frame01} onClick={onDepth5FrameClick}>
                    										<img className={styles.depth8Frame01} alt="" src="Depth 8, Frame 0.svg" />
                    										<div className={styles.depth4Frame1}>
                      											<div className={styles.destinations}>Hotels</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth7Frame01} onClick={onDepth5FrameClick}>
                    										<img className={styles.depth8Frame01} alt="" src="Depth 8, Frame 0.svg" />
                    										<div className={styles.depth4Frame1}>
                      											<div className={styles.destinations}>Cars</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth7Frame7}>
                  									<img className={styles.depth8Frame2} alt="" src="Depth 8, Frame 2.svg" />
                  									<div className={styles.depth4Frame1}>
                    										<div className={styles.destinations}>Gift Cards</div>
                  									</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.depth3Frame11}>
              							<div className={styles.depth4Frame01}>
                								<div className={styles.depth4Frame1}>
                  									<div className={styles.iftakharMajumder}>Trips</div>
                								</div>
                								<div className={styles.depth4Frame1}>
                  									<div className={styles.iftakharMajumder}>/</div>
                								</div>
                								<div className={styles.depth5Frame21}>
                  									<div className={styles.iftakharMajumder}>Upcoming</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame12}>
                								<div className={styles.depth5Frame02}>
                  									<div className={styles.depth4Frame1}>
                    										<div className={styles.yourTripTo}>Your trip to Bangladesh</div>
                  									</div>
                  									<div className={styles.depth6Frame11}>
                    										<div className={styles.dec10}>Dec 10 - Dec 17</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame21}>
                								<div className={styles.depth5Frame03}>
                  									<div className={styles.depth6Frame02}>
                    										<div className={styles.depth4Frame1}>
                      											<b className={styles.planYourNext}>Overview</b>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame12}>
                    										<div className={styles.depth4Frame1}>
                      											<b className={styles.planYourNext}>Itinerary</b>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame3}>
                								<div className={styles.depth5Frame04}>
                  									<div className={styles.depth6Frame03}>
                    										<img className={styles.depth8Frame01} alt="" src="Depth 7, Frame 0.svg" />
                    										<div className={styles.depth7Frame12} />
                  									</div>
                  									<div className={styles.depth6Frame13}>
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.iftakharMajumder}>Arrive at Hazrat Shahjalal International Airport</div>
                    										</div>
                    										<div className={styles.depth7Frame13}>
                      											<div className={styles.dec10}>Dec 10, 8:00 AM</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame04}>
                  									<div className={styles.depth6Frame04}>
                    										<div className={styles.depth7Frame06} />
                    										<img className={styles.depth8Frame01} alt="" src="Depth 7, Frame 1.svg" />
                    										<div className={styles.depth7Frame12} />
                  									</div>
                  									<div className={styles.depth6Frame13}>
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.iftakharMajumder}>Check-in to Pan Pacific Sonargaon Dhaka</div>
                    										</div>
                    										<div className={styles.depth7Frame13}>
                      											<div className={styles.dec10}>Dec 10, 10:00 AM</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame04}>
                  									<div className={styles.depth6Frame04}>
                    										<div className={styles.depth7Frame06} />
                    										<img className={styles.depth8Frame01} alt="" src="Depth 7, Frame 1.svg" />
                    										<div className={styles.depth7Frame12} />
                  									</div>
                  									<div className={styles.depth6Frame13}>
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.iftakharMajumder}>Dinner at Dhaka Regency Hotel</div>
                    										</div>
                    										<div className={styles.depth7Frame13}>
                      											<div className={styles.dec10}>Dec 10, 7:00 PM</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame04}>
                  									<div className={styles.depth6Frame04}>
                    										<div className={styles.depth7Frame06} />
                    										<img className={styles.depth8Frame01} alt="" src="Depth 7, Frame 1.svg" />
                    										<div className={styles.depth7Frame12} />
                  									</div>
                  									<div className={styles.depth6Frame13}>
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.iftakharMajumder}>Visit Lalbagh Fort</div>
                    										</div>
                    										<div className={styles.depth7Frame13}>
                      											<div className={styles.dec10}>Dec 11, 9:00 AM</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame04}>
                  									<div className={styles.depth6Frame04}>
                    										<div className={styles.depth7Frame06} />
                    										<img className={styles.depth8Frame01} alt="" src="Depth 7, Frame 1.svg" />
                    										<div className={styles.depth7Frame12} />
                  									</div>
                  									<div className={styles.depth6Frame13}>
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.iftakharMajumder}>{`Lunch at Star Kabab & Restaurant`}</div>
                    										</div>
                    										<div className={styles.depth7Frame13}>
                      											<div className={styles.dec10}>Dec 11, 12:00 PM</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame04}>
                  									<div className={styles.depth6Frame04}>
                    										<div className={styles.depth7Frame06} />
                    										<img className={styles.depth8Frame01} alt="" src="Depth 7, Frame 1.svg" />
                    										<div className={styles.depth7Frame12} />
                  									</div>
                  									<div className={styles.depth6Frame13}>
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.iftakharMajumder}>Explore Ahsan Manzil</div>
                    										</div>
                    										<div className={styles.depth7Frame13}>
                      											<div className={styles.dec10}>Dec 11, 3:00 PM</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame04}>
                  									<div className={styles.depth6Frame04}>
                    										<div className={styles.depth7Frame06} />
                    										<img className={styles.depth8Frame01} alt="" src="Depth 7, Frame 1.svg" />
                    										<div className={styles.depth7Frame12} />
                  									</div>
                  									<div className={styles.depth6Frame13}>
                    										<div className={styles.depth1Frame0}>
                      											<div className={styles.iftakharMajumder}>Day trip to Cox's Bazar</div>
                      											</div>
                      											<div className={styles.depth7Frame13}>
                        												<div className={styles.dec10}>Dec 12, 9:00 AM</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame04}>
                    										<div className={styles.depth6Frame010}>
                      											<div className={styles.depth7Frame06} />
                      											<img className={styles.depth8Frame01} alt="" src="Depth 7, Frame 1.svg" />
                    										</div>
                    										<div className={styles.depth6Frame13}>
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.iftakharMajumder}>Shopping at Aarong</div>
                      											</div>
                      											<div className={styles.depth7Frame13}>
                        												<div className={styles.dec10}>Dec 12, 7:00 PM</div>
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
      			
      			export default MyTrips;
      			