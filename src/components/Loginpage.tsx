import { FunctionComponent } from 'react';
import './Loginpage.module.css';


const Component1:FunctionComponent = () => {
  	return (
    		<div className="div">
      			<div className="images">
        				<img className="images-child" alt="" src="Rectangle 6.png" />
        				<img className="images-item" alt="" src="Rectangle 7.png" />
        				<img className="images-inner" alt="" src="Rectangle 8.png" />
        				<img className="rectangle-icon" alt="" src="Rectangle 9.png" />
        				<img className="images-child1" alt="" src="Rectangle 6.png" />
        				<img className="images-child2" alt="" src="Rectangle 7.png" />
        				<img className="images-child3" alt="" src="Rectangle 8.png" />
        				<img className="images-child4" alt="" src="Rectangle 9.png" />
        				<img className="images-child5" alt="" src="Rectangle 6.png" />
        				<img className="images-child6" alt="" src="Rectangle 7.png" />
        				<img className="images-child7" alt="" src="Rectangle 8.png" />
        				<img className="images-child8" alt="" src="Rectangle 9.png" />
        				<img className="images-child9" alt="" src="Rectangle 6.png" />
        				<img className="images-child10" alt="" src="Rectangle 7.png" />
        				<img className="images-child11" alt="" src="Rectangle 8.png" />
        				<img className="images-child12" alt="" src="Rectangle 9.png" />
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
