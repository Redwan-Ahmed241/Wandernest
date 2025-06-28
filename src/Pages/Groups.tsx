import { FunctionComponent, useCallback } from 'react';
import styles from '../Styles/Group.module.css';
import Footer from '../Components/Footer';

const Groups:FunctionComponent = () => {
  	
  	const onDepth5FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	
  	const onDepth5FrameClick1 = useCallback(() => {
    		const anchor = document.querySelector("[data-scroll-to='depth2Frame1']");
    		if(anchor) {
      			anchor.scrollIntoView({"block":"start","behavior":"smooth"})
    		}
  	}, []);
  	
  	return (
		<>
    		<div className={styles.groups}>
      			<div className={styles.groups1}>
        				<div className={styles.depth0Frame0}>
          					<div className={styles.depth1Frame0}>
            						<div className={styles.depth2Frame0}>
              							<div className={styles.depth3Frame0}>
                								<div className={styles.depth4Frame0}>
                  									<img className={styles.depth5Frame2} alt="" src="Depth 5, Frame 2.svg" />
                  									<div className={styles.depth5Frame1}>
                    										<b className={styles.wandernest}>{`WanderNest `}</b>
                  									</div>
                								</div>
                								<div className={styles.depth4Frame1}>
                  									<div className={styles.depth5Frame0} onClick={onDepth5FrameClick}>
                    										<div className={styles.home}>Home</div>
                  									</div>
                  									<div className={styles.depth5Frame0} onClick={onDepth5FrameClick1}>
                    										<div className={styles.home}>Groups</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.depth3Frame1}>
                								<div className={styles.depth4Frame01}>
                  									<div className={styles.depth5Frame01}>
                    										<img className={styles.depth6Frame0} alt="" src="Depth 6, Frame 0.svg" />
                    										<div className={styles.depth6Frame1}>
                      											<div className={styles.search}>Search</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth4Frame11}>
                  									<img className={styles.depth5Frame12} alt="" src="Depth 5, Frame 1.svg" />
                  									<img className={styles.depth5Frame12} alt="" src="Depth 5, Frame 2.svg" />
                								</div>
                								<img className={styles.depth4Frame2} alt="" src="" />
              							</div>
            						</div>
            						<div className={styles.depth2Frame1} data-scroll-to="depth2Frame1">
              							<div className={styles.depth3Frame01}>
                								<div className={styles.depth4Frame02}>
                  									<div className={styles.depth5Frame02}>
                    										<div className={styles.depth6Frame01}>
                      											<div className={styles.depth7Frame0}>
                        												<div className={styles.depth8Frame0}>
                          													<b className={styles.adventureSeekersCommunity}>Adventure Seekers Community</b>
                        												</div>
                      											</div>
                      											<b className={styles.adventureSeekers}>Adventure seekers</b>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth4Frame12}>
                  									<img className={styles.depth5Frame03} alt="" src="Depth 5, Frame 0.png" />
                  									<img className={styles.depth5Frame03} alt="" src="Depth 5, Frame 1.png" />
                  									<img className={styles.depth5Frame03} alt="" src="Depth 5, Frame 2.png" />
                  									<img className={styles.depth5Frame03} alt="" src="Depth 5, Frame 3.png" />
                  									<img className={styles.depth5Frame03} alt="" src="Depth 5, Frame 4.png" />
                  									<img className={styles.depth5Frame03} alt="" src="Depth 5, Frame 5.png" />
                  									<img className={styles.depth5Frame03} alt="" src="Depth 5, Frame 6.png" />
                  									<img className={styles.depth5Frame03} alt="" src="Depth 5, Frame 7.png" />
                  									<img className={styles.depth5Frame8} alt="" src="Depth 5, Frame 8.png" />
                								</div>
                								<div className={styles.depth4Frame21}>
                  									<div className={styles.depth5Frame04}>
                    										<div className={styles.depth6Frame02}>
                      											<div className={styles.depth8Frame0}>
                        												<b className={styles.about}>About</b>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame11}>
                      											<div className={styles.depth8Frame0}>
                        												<b className={styles.about}>Discussion</b>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame02}>
                      											<div className={styles.depth8Frame0}>
                        												<b className={styles.about}>Featured</b>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame02}>
                      											<div className={styles.depth8Frame0}>
                        												<b className={styles.about}>Members</b>
                      											</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth4Frame3}>
                  									<div className={styles.depth5Frame05}>
                    										<div className={styles.depth5Frame01}>
                      											<div className={styles.depth7Frame05}>
                        												<img className={styles.depth8Frame01} alt="" src="Depth 8, Frame 0.png" />
                      											</div>
                      											<div className={styles.depth7Frame1}>
                        												<div className={styles.depth8Frame02}>
                          													<div className={styles.shareYourThoughts}>Share your thoughts.....</div>
                          													<div className={styles.depth8Frame0Child} />
                        												</div>
                        												<div className={styles.depth8Frame1}>
                          													<div className={styles.depth9Frame0}>
                            														<div className={styles.depth10Frame0}>
                              															<img className={styles.depth11Frame0} alt="" src="Depth 11, Frame 0.svg" />
                              															<img className={styles.depth11Frame0} alt="" src="Depth 11, Frame 1.svg" />
                              															<img className={styles.depth11Frame0} alt="" src="Depth 11, Frame 2.svg" />
                            														</div>
                            														<div className={styles.depth10Frame1}>
                              															<div className={styles.depth11Frame01} />
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
                								<div className={styles.depth4Frame4}>
                  									<b className={styles.newPosts}>New Posts</b>
                								</div>
                								<div className={styles.depth4Frame5}>
                  									<div className={styles.depth5Frame06}>
                    										<div className={styles.depth6Frame04}>
                      											<div className={styles.depth7Frame06}>
                        												<div className={styles.depth8Frame03}>
                          													<b className={styles.adventureCertificate}>Adventure Certificate</b>
                        												</div>
                        												<div className={styles.depth8Frame11}>
                          													<div className={styles.about}>Posted by Alex - 1h ago</div>
                        												</div>
                      											</div>
                      											<div className={styles.depth7Frame11}>
                        												<div className={styles.depth8Frame04}>
                          													<div className={styles.viewDetails}>View Details</div>
                        												</div>
                        												<img className={styles.depth8Frame12} alt="" src="Depth 8, Frame 1.svg" />
                      											</div>
                    										</div>
                    										<img className={styles.depth6Frame12} alt="" src="Depth 6, Frame 1.png" />
                  									</div>
                  									<div className={styles.depth5Frame06}>
                    										<div className={styles.depth6Frame04}>
                      											<div className={styles.depth7Frame06}>
                        												<div className={styles.depth8Frame03}>
                          													<b className={styles.adventureCertificate}>My first tour at Rangmati</b>
                        												</div>
                        												<div className={styles.depth8Frame11}>
                          													<div className={styles.about}>Posted by Robin - 1h ago</div>
                        												</div>
                      											</div>
                      											<div className={styles.depth7Frame11}>
                        												<div className={styles.depth8Frame04}>
                          													<div className={styles.viewDetails}>View Details</div>
                        												</div>
                        												<img className={styles.depth8Frame12} alt="" src="Depth 8, Frame 1.svg" />
                      											</div>
                    										</div>
                    										<img className={styles.depth6Frame12} alt="" src="Depth 6, Frame 1.png" />
                  									</div>
                  									<div className={styles.depth5Frame23}>
                    										<div className={styles.depth6Frame04}>
                      											<div className={styles.depth7Frame06}>
                        												<div className={styles.depth8Frame03}>
                          													<b className={styles.adventureCertificate}>I got scammed!!!</b>
                        												</div>
                        												<div className={styles.depth8Frame11}>
                          													<div className={styles.about}>Posted by Fred - 1h ago</div>
                        												</div>
                      											</div>
                      											<div className={styles.depth7Frame11}>
                        												<div className={styles.depth8Frame04}>
                          													<div className={styles.viewDetails}>View Details</div>
                        												</div>
                        												<img className={styles.depth8Frame12} alt="" src="Depth 8, Frame 1.svg" />
                      											</div>
                    										</div>
                    										<img className={styles.depth6Frame12} alt="" src="Depth 6, Frame 1.png" />
                  									</div>
                								</div>
              							</div>
              							<div className={styles.depth3Frame11}>
                								<div className={styles.depth4Frame03}>
                  									<div className={styles.depth5Frame07}>
                    										<div className={styles.depth6Frame07}>
                      											<div className={styles.depth7Frame09}>
                        												<div className={styles.depth8Frame09}>
                          													<div className={styles.about}>About</div>
                        												</div>
                      											</div>
                      											<div className={styles.depth7Frame14}>
                        												<div className={styles.depth8Frame010}>
                          													<div className={styles.about}>Adventure community for thrill-seekers.</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.depth6Frame15}>
                      											<div className={styles.depth7Frame010}>
                        												<div className={styles.depth8Frame011}>
                          													<div className={styles.about}>Privacy</div>
                        												</div>
                      											</div>
                      											<div className={styles.depth7Frame15}>
                        												<div className={styles.depth8Frame011}>
                          													<div className={styles.about}>Private: Members-only posts.</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth7Frame09}>
                    										<div className={styles.depth6Frame08}>
                      											<div className={styles.depth7Frame09}>
                        												<div className={styles.depth8Frame09}>
                          													<div className={styles.about}>Visibility</div>
                        												</div>
                      											</div>
                      											<div className={styles.depth7Frame16}>
                        												<div className={styles.depth8Frame09}>
                          													<div className={styles.about}>Visible: Anyone can find the group.</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className={styles.depth5Frame24} />
                								</div>
                								<div className={styles.depth4Frame13}>
                  									<div className={styles.depth5Frame08}>
                    										<img className={styles.depth6Frame09} alt="" src="Depth 6, Frame 0.png" />
                    										<img className={styles.depth6Frame09} alt="" src="Depth 6, Frame 1.png" />
                  									</div>
                  									<div className={styles.depth5Frame08}>
                    										<img className={styles.depth6Frame09} alt="" src="Depth 6, Frame 0.png" />
                    										<img className={styles.depth6Frame09} alt="" src="Depth 6, Frame 1.png" />
                  									</div>
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
      			<div className={styles.post}>Post</div>
      		
    		</div>
			<Footer />
		</>
			);
};

export default Groups;
