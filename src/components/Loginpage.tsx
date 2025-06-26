import { FunctionComponent } from 'react';
import styles from './Loginpage.module.css';


const Component1:FunctionComponent = () => {
  	return (
    		<div className="div">
      	<div className={styles.images}>
  <div className={styles.imagesChild} />
  <div className={styles.imagesItem} />
  <div className={styles.imagesInner} />
  <div className={styles.rectangleIcon} />
  <div className={styles.imagesChild1} />
  <div className={styles.imagesChild2} />
  <div className={styles.imagesChild3} />
  <div className={styles.imagesChild4} />
  <div className={styles.imagesChild5} />
  <div className={styles.imagesChild6} />
  <div className={styles.imagesChild7} />
  <div className={styles.imagesChild8} />
  <div className={styles.imagesChild9} />
  <div className={styles.imagesChild10} />
  <div className={styles.imagesChild11} />
  <div className={styles.imagesChild12} />
</div>
      			<div className="background">
        				<div className="background-child" />
      			</div>
      			<div className="frame-parent">
        				<div className="frame-wrapper">
          					<div className="frame-group">
            						<div className="welcome-back-parent">
              							<div className="welcome-back">Welcome back</div>
              							<div className="were-so-excited">We’re so excited to see you again!</div>
            						</div>
            						<div className="email-parent">
              							<div className="email">
                								<div className="label-wrapper">
                  									<div className="label">Email or phone number</div>
                								</div>
                								<div className="text-field" />
              							</div>
              							<div className="email-group">
                								<div className="email">
                  									<div className="label-wrapper">
                    										<div className="label">Password</div>
                  									</div>
                  									<div className="text-field" />
                								</div>
                								<div className="have-an-account-login">
                  									<div className="already-have-an">Forget your password</div>
                								</div>
              							</div>
            						</div>
            						<div className="button">
              							<div className="sign-up-wrapper">
                								<div className="welcome-back">Log in</div>
              							</div>
            						</div>
            						<div className="have-an-account-login1">
              							<div className="already-have-an-container">
                								<span>{`Don’t have an acount? `}</span>
                								<span className="sign-up1">{`Sign up  `}</span>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className="frame-container">
          					<div className="qr-code-parent">
            						<img className="qr-code-icon" alt="" src="QR Code.svg" />
            						<div className="log-in-with-qr-code-parent">
              							<div className="log-in-with">Log in with QR code</div>
              							<div className="scan-this-with">Scan this with our App to log in instantly</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default Component1;
