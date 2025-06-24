import { FunctionComponent, useCallback } from 'react';
import styles from './TermsOfService.module.css';


const TermsOfService:FunctionComponent = () => {
  	
  	const onDepth4FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.termsOfService}>
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
                  									<div className={styles.termsOfService1}>Terms of Service</div>
                								</div>
              							</div>
              							<div className={styles.depth4Frame12}>
                								<div className={styles.theseTermsOf}>These Terms of Service (the 'Agreement') are an agreement between WanderNest, Inc. ('WanderNest' or 'us'), the owner and operator of wandernest.com (the 'Site'), the WanderNest software (the 'Software'), and you ('you' or 'You'), a user of the Site or Software. This Agreement sets forth the general terms and conditions of your use of the Site and the Software.</div>
              							</div>
              							<div className={styles.depth4Frame2}>
                								<b className={styles.accounts}>Accounts</b>
              							</div>
              							<div className={styles.depth4Frame12}>
                								<div className={styles.theseTermsOf}>Account Creation. In order to use the Software, you must create an account on the Site (an 'Account'). You represent and warrant that all information you submit when you create your Account is accurate, current and complete, and that you will keep your Account information accurate, current or complete. If WanderNest believes that your information is not accurate, current or complete, we have the right to refuse you access to the Site and Software, and to terminate or suspend your Account.</div>
              							</div>
              							<div className={styles.depth4Frame2}>
                								<b className={styles.accounts}>Modifications</b>
              							</div>
              							<div className={styles.depth4Frame12}>
                								<div className={styles.theseTermsOf}>To the Agreement. WanderNest reserves the right to change this Agreement from time to time. The most current version of this Agreement will be located on the Site. You understand and agree that if you use the Software after the date on which the Agreement has changed, WanderNest will treat your use as acceptance of the updated Agreement.</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default TermsOfService;
