import { FunctionComponent, useCallback } from 'react';
import styles from './aboutUs.module.css';

const AboutUs:FunctionComponent = () => {
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.aboutUs}>
      			<div className={styles.aboutUs1}>
        				<div className={styles.aboutUs2} />
        				<div className={styles.navbar}>
          					<div className={styles.depth3Frame0}>
            						<img className={styles.depth4Frame0} alt="" src="/Figma_photoes/aboutUsHero.jpg" />
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
              							<img className={styles.depth5Frame21} alt="" src="/Figma_photoes/thePhoto-modified-reduced.jpg" />
            						</div>
          					</div>
        				</div>
        				<div className={styles.frame}>
          					<div className={styles.depth2Frame0}>
            						<div className={styles.depth3Frame01}>
              							<div className={styles.depth4Frame02}>
                								<div className={styles.depth5Frame02}>
                  									<div className={styles.depth6Frame02}>
                    										<div className={styles.depth7Frame0}>
                      											<div className={styles.depth8Frame0} />
                      											<div className={styles.depth8Frame1}>
                        												<div className={styles.explorePurposefullyTravel}>Explore purposefully, Travel meaningfully, Feel at home anywhere.</div>
                      											</div>
                    										</div>
                    										<div className={styles.findYourNest}>Find Your Nest, Wander the World.</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame12}>
                								<div className={styles.depth5Frame03}>
                  									<div className={styles.depth6Frame03}>
                    										<img className={styles.thephotoModifiedReducedRemoIcon} alt="" src="/Figma_photoes/thePhoto-modified-reduced-removebg-preview 1.png" />
                    										<div className={styles.depth4Frame02}>
                      											<div className={styles.depth8Frame01}>
                        												<div className={styles.ejazUddinSwaron}>Ejaz Uddin Swaron</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Bangladesh</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Passionate developer with expertise in creating modern web applications.</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame03}>
                    										<img className={styles.thephotoModifiedReducedRemoIcon} alt="" src="redwan-bro-modified-reduced-removebg-preview 1.png" />
                    										<div className={styles.depth4Frame02}>
                      											<div className={styles.depth8Frame01}>
                        												<div className={styles.ejazUddinSwaron}>Shah Redwan Ahmed</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Bangladesh</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Passionate developer with expertise in creating modern web applications.</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame03}>
                    										<img className={styles.thephotoModifiedReducedRemoIcon} alt="" src="ifty_bro_2-modified_reduced 1.png" />
                    										<div className={styles.depth4Frame02}>
                      											<div className={styles.depth8Frame01}>
                        												<div className={styles.ejazUddinSwaron}>Ifthakar Majumder</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Bangladesh</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Passionate developer with expertise in creating modern web applications.</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame03}>
                    										<img className={styles.thephotoModifiedReducedRemoIcon} alt="" src="mithil_bro-modified_reduced-removebg-preview 1.png" />
                    										<div className={styles.depth4Frame02}>
                      											<div className={styles.depth8Frame01}>
                        												<div className={styles.ejazUddinSwaron}>Mojammelul Hossain</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Bangladesh</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Passionate developer with expertise in creating modern web applications.</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth6Frame03}>
                    										<img className={styles.thephotoModifiedReducedRemoIcon} alt="" src="abtahi_bro-modified-reduced 1.png" />
                    										<div className={styles.depth4Frame02}>
                      											<div className={styles.depth8Frame01}>
                        												<div className={styles.ejazUddinSwaron}>Abathi Majumader</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Bangladesh</div>
                      											</div>
                      											<div className={styles.depth4Frame02}>
                        												<div className={styles.bangladesh}>Passionate developer with expertise in creating modern web applications.</div>
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
              							<div className={styles.depth5Frame04}>
                								<div className={styles.depth6Frame04} onClick={onDepth4FrameClick}>
                  									<div className={styles.explorePurposefullyTravel}>About Us</div>
                								</div>
                								<div className={styles.depth6Frame11}>
                  									<div className={styles.explorePurposefullyTravel}>Contact</div>
                								</div>
                								<div className={styles.depth6Frame04} onClick={onDepth4FrameClick}>
                  									<div className={styles.explorePurposefullyTravel}>Terms of Service</div>
                								</div>
                								<div className={styles.depth6Frame04} onClick={onDepth4FrameClick}>
                  									<div className={styles.explorePurposefullyTravel}>Privacy Policy</div>
                								</div>
              							</div>
              							<div className={styles.depth5Frame12}>
                								<img className={styles.depth6Frame05} alt="" src="aboutUsHero.jpg" />
                								<img className={styles.depth6Frame05} alt="" src="aboutUsHero.jpg" />
                								<img className={styles.depth6Frame05} alt="" src="aboutUsHero.jpg" />
              							</div>
              							<div className={styles.depth5Frame22}>
                								<div className={styles.explorePurposefullyTravel}>@2025 WanderNest, All rights reserved.</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default AboutUs;
