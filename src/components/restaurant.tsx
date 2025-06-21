import { FunctionComponent, useCallback } from 'react';
import styles from './restaurant.module.css';


const Restaurant:FunctionComponent = () => {
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.restaurant}>
      			<div className={styles.restaurants}>
        				<div className={styles.depth0Frame0}>
          					<div className={styles.depth1Frame0}>
            						<div className={styles.navbar}>
              							<div className={styles.depth3Frame0}>
                								<img className={styles.depth4Frame0} alt="" src="Depth 4, Frame 0.svg" />
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
                  									<img className={styles.depth5Frame21} alt="" src="Depth 5, Frame 2.svg" />
                								</div>
              							</div>
            						</div>
            						<div className={styles.depth2Frame1}>
              							<div className={styles.depth3Frame01}>
                								<div className={styles.depth4Frame02}>
                  									<div className={styles.depth5Frame02}>
                    										<div className={styles.depth6Frame02}>
                      											<div className={styles.destinations}>Popular</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame02}>
                    										<div className={styles.depth6Frame02}>
                      											<div className={styles.destinations}>Highest Rated</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame02}>
                    										<div className={styles.depth6Frame02}>
                      											<div className={styles.destinations}>Newest</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame02}>
                    										<div className={styles.depth6Frame02}>
                      											<div className={styles.destinations}>Budget-friendly</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame02}>
                    										<div className={styles.depth6Frame06}>
                      											<div className={styles.destinations}>Fast Delivery</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame02}>
                    										<div className={styles.depth6Frame07}>
                      											<div className={styles.destinations}>Halal</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth4Frame12}>
                  									<div className={styles.depth5Frame03}>
                    										<div className={styles.depth6Frame08}>
                      											<img className={styles.depth7Frame0} alt="" src="Depth 7, Frame 0.svg" />
                      											<div className={styles.depth7Frame1}>
                        												<div className={styles.searchRestaurantsOr}>Search  restaurants or cuisines</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth4Frame2}>
                  									<b className={styles.topRatedEateriesAcross}>Top-Rated Eateries Across Bangladesh</b>
                								</div>
                								<div className={styles.depth4Frame3}>
                  									<div className={styles.depth5Frame04}>
                    										<div className={styles.depth6Frame09}>
                      											<img className={styles.depth7Frame01} alt="" src="Depth 7, Frame 0.png" />
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.depth1Frame0}>
                          													<div className={styles.northEndCoffeeContainer}>
                            														<p className={styles.northEndCoffee}>{`NORTH END coffee `}</p>
                            														<p className={styles.northEndCoffee}>( Shahajadpur,Dhaka)</p>
                          													</div>
                        												</div>
                        												<div className={styles.depth8Frame1}>
                          													<div className={styles.reviewsBengali}>4.8★ (1,200+ reviews) · Bengali cuisine</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame09}>
                      											<img className={styles.depth7Frame01} alt="" src="Depth 7, Frame 0.png" />
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.depth1Frame0}>
                          													<div className={styles.northEndCoffeeContainer}>Mezzan Haile Aaiun(Chittagong)</div>
                        												</div>
                        												<div className={styles.depth8Frame1}>
                          													<div className={styles.reviewsBengali}>4.7★ (950+ reviews) · Traditional Bangladeshi dishes</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame09}>
                      											<img className={styles.depth7Frame01} alt="" src="Depth 7, Frame 0.png" />
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.depth1Frame0}>
                          													<div className={styles.northEndCoffeeContainer}>Panshi Restaurant (Sylhet)</div>
                        												</div>
                        												<div className={styles.depth8Frame1}>
                          													<div className={styles.reviewsBengali}>4.6★ (800+ reviews) · Sylheti specialties</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame09}>
                      											<img className={styles.depth7Frame01} alt="" src="Depth 7, Frame 0.png" />
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.depth1Frame0}>
                          													<div className={styles.northEndCoffeeContainer}>
                            														<p className={styles.northEndCoffee}>Sultans Dine</p>
                            														<p className={styles.northEndCoffee}>(Gulshan 2)</p>
                          													</div>
                        												</div>
                        												<div className={styles.depth8Frame1}>
                          													<div className={styles.reviewsBengali}>4.9★ (1,500+ reviews) · Biryani and kebabs</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame09}>
                      											<img className={styles.depth7Frame01} alt="" src="Depth 7, Frame 0.png" />
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.depth1Frame0}>
                          													<div className={styles.northEndCoffeeContainer}>Kamrul Hotel(Khulna)</div>
                        												</div>
                        												<div className={styles.depth8Frame1}>
                          													<div className={styles.reviewsBengali}>4.5★ (700+ reviews) · Orginal Chuijhaal flavors</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame13}>
                    										<div className={styles.depth6Frame09}>
                      											<img className={styles.depth7Frame01} alt="" src="Depth 7, Frame 0.png" />
                      											<div className={styles.depth1Frame0}>
                        												<div className={styles.depth1Frame0}>
                          													<div className={styles.northEndCoffeeContainer}>Kacchi Vai (Narayanganj)</div>
                        												</div>
                        												<div className={styles.depth8Frame1}>
                          													<div className={styles.reviewsBengali}>
                            														<p className={styles.northEndCoffee}>{`4.7★ (600+ reviews) `}</p>
                            														<p className={styles.northEndCoffee}>Get the taste of delicious Kacchi</p>
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
      			</div>
      			<div className={styles.footer}>
        				<div className={styles.depth3Frame02}>
          					<div className={styles.depth4Frame03}>
            						<div className={styles.depth5Frame05}>
              							<div className={styles.depth6Frame011} onClick={onDepth4FrameClick}>
                								<div className={styles.aboutUs}>About Us</div>
              							</div>
              							<div className={styles.depth6Frame11}>
                								<div className={styles.aboutUs}>Contact</div>
              							</div>
              							<div className={styles.depth6Frame011} onClick={onDepth4FrameClick}>
                								<div className={styles.aboutUs}>Terms of Service</div>
              							</div>
              							<div className={styles.depth6Frame011} onClick={onDepth4FrameClick}>
                								<div className={styles.aboutUs}>Privacy Policy</div>
              							</div>
            						</div>
            						<div className={styles.depth5Frame14}>
              							<img className={styles.depth6Frame012} alt="" src="Depth 6, Frame 0.svg" />
              							<img className={styles.depth6Frame012} alt="" src="Depth 6, Frame 1.svg" />
              							<img className={styles.depth6Frame012} alt="" src="Depth 6, Frame 2.svg" />
            						</div>
            						<div className={styles.depth5Frame23}>
              							<div className={styles.aboutUs}>@2025 WanderNest, All rights reserved.</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default Restaurant;
