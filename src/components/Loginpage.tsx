import { FunctionComponent } from 'react';
import styles from './Loginpage.module.css';

const Loginpage: FunctionComponent = () => {
  return (
    <div className={styles.div}>
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

      <div className={styles.background}>
        <div className={styles.backgroundChild} />
      </div>

      <div className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <div className={styles.frameGroup}>
            <div className={styles.welcomeBackParent}>
              <div className={styles.welcomeBack}>Welcome back</div>
              <div className={styles.wereSoExcited}>We’re so excited to see you again!</div>
            </div>

            <div className={styles.emailParent}>
              <div className={styles.email}>
                <div className={styles.labelWrapper}>
                  <div className={styles.label}>Email or phone number</div>
                </div>
                <div className={styles.textField} />
              </div>

              <div className={styles.emailGroup}>
                <div className={styles.email}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>Password</div>
                  </div>
                  <div className={styles.textField} />
                </div>
                <div className={styles.haveAnAccountLogin}>
                  <div className={styles.alreadyHaveAn}>Forget your password</div>
                </div>
              </div>
            </div>

            <div className={styles.button}>
              <div className={styles.signUpWrapper}>
                <div className={styles.welcomeBack}>Log in</div>
              </div>
            </div>

            <div className={styles.haveAnAccountLogin1}>
              <div className={styles.alreadyHaveAnContainer}>
                <span>Don’t have an acount? </span>
                <span className={styles.signUp1}>Sign up</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.frameContainer}>
          <div className={styles.qrCodeParent}>
            <img className={styles.qrCodeIcon} alt="" src="QR Code.svg" />
            <div className={styles.logInWithQrCodeParent}>
              <div className={styles.logInWith}>Log in with QR code</div>
              <div className={styles.scanThisWith}>Scan this with our App to log in instantly</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
