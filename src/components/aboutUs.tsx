import { FunctionComponent, useCallback } from 'react';
import styles from './aboutUs.module.css';
import Layout from './Layout';
const AboutUs:FunctionComponent = () => {
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return ( <Layout>
    		<div className={styles.aboutUs}>
      			<div className={styles.aboutUs1}>
        				<div className={styles.aboutUs2} />
        				
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
                        												<div className={styles.ejazUddinSwaron}>Mojjammel Hossain</div>
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
                        												<div className={styles.ejazUddinSwaron}>Abathi Arifeen</div>
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
        			
      			</div>
    		</div>
			</Layout>	
			);
};

export default AboutUs;
