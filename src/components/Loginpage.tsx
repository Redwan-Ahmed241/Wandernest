import { FunctionComponent, useCallback, useState } from 'react';
import styles from './Loginpage.module.css';
import Footer from './Footer';
//                     										<div className={styles.depth5Frame2}>';


const LoginPage:FunctionComponent = () => {
  	
  	const onDepth6FrameClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.loginPage}>
      			<div className={styles.loginPage1}>
        				<div className={styles.depth0Frame0}>
          					<div className={styles.depth1Frame0}>
            						<img className={styles.vector0} alt="" src="Vector - 0.svg" />
            						<b className={styles.wandernest}>WanderNest</b>
          					</div>
							
          					{/* <div className={styles.footer}>
            						<div className={styles.depth3Frame0}>
              							<div className={styles.depth4Frame0}>
                								<div className={styles.depth5Frame0}>
                  									<div className={styles.depth6Frame0} onClick={onDepth6FrameClick}>
                    										<div className={styles.aboutUs}>About Us</div>
                  									</div>
                  									<div className={styles.depth6Frame1}>
                    										<div className={styles.aboutUs}>Contact</div>
                  									</div>
                  									<div className={styles.depth6Frame0} onClick={onDepth6FrameClick}>
                    										<div className={styles.aboutUs}>Terms of Service</div>
                  									</div>
                  									<div className={styles.depth6Frame0} onClick={onDepth6FrameClick}>
                    										<div className={styles.aboutUs}>Privacy Policy</div>
                  									</div>
                								</div>
                								<div className={styles.depth5Frame1}>
                  									<img className={styles.depth6Frame01} alt="" src="Depth 6, Frame 0.svg" />
                  									<img className={styles.depth6Frame01} alt="" src="Depth 6, Frame 1.svg" />
                  									<img className={styles.depth6Frame01} alt="" src="Depth 6, Frame 2.svg" />
                								</div>
                								<div className={styles.depth5Frame2}>
                  									<div className={styles.aboutUs}>@2025 WanderNest, All rights reserved.</div>
                								</div>
              							</div>
            						</div>
          					</div> */}
          					<div className={styles.wandernestParent}>
            						<b className={styles.wandernest1}>WanderNest</b>
            						<div className={styles.groupChild} />
            						<div className={styles.depth5Frame01}>
              							<div className={styles.depth6Frame02}>
                								<div className={styles.emailAddress}>Email Address</div>
              							</div>
              							<div className={styles.depth6Frame12}>
                								<div className={styles.enterYourEmail}>Enter  your email</div>
              							</div>
            						</div>
            						<div className={styles.depth5Frame02}>
              							<div className={styles.depth6Frame02}>
                								<div className={styles.emailAddress}>Password</div>
              							</div>
              							<div className={styles.depth6Frame13}>
                								<div className={styles.depth7Frame0}>
                  									<div className={styles.enterYourEmail}>Enter  your password</div>
                								</div>
                								<img className={styles.depth7Frame1} alt="" src="Depth 7, Frame 1.svg" />
              							</div>
            						</div>
            						<div className={styles.depth5Frame0Parent}>
              							<div className={styles.depth5Frame03} onClick={onDepth6FrameClick}>
                								<div className={styles.depth6Frame04} />
              							</div>
              							<b className={styles.logIn}>Log In</b>
            						</div>
            						<div className={styles.dontHaveAn}>Don't have an account?</div>
              							<div className={styles.depth5Frame0Group}>
                								<div className={styles.depth5Frame04}>
                  									<div className={styles.depth6Frame05} />
                								</div>
                								<b className={styles.signUp}>Sign Up</b>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
				);
      			};
      			
      			export default LoginPage;
      			