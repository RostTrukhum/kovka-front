import { ReactComponent as CallIcon } from '../../assets/icons/phone.svg';
import { Messangers } from '../messangers';

import './style.css';

export const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-column">
        <CallIcon className="footer-call" />
        <span className="footer-call-text">Зателефонуйте нам</span>
        <div className="footer-call-number-wrapper">
          <span className="footer-call-number-text">
            Телефон:{' '}
            <a className="footer-call-number-link" href="tel:+380931107969">
              +38(093)110-79-69
            </a>
          </span>
          <span className="footer-call-number-text">
            Телефон:{' '}
            <a className="footer-call-number-link" href="tel:+380673705288">
              +38(067)370-52-88
            </a>
          </span>
        </div>
        <span className="footer-call-number-text ">
          E-mail:{' '}
          <a className="footer-call-number-link" href="mailto:gospodar.kovka@gmail.com">
            gospodar.kovka@gmail.com
          </a>
        </span>
      </div>
      <Messangers />
    </div>
  );
};
