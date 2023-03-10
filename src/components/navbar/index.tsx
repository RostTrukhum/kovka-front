import { ReactComponent as ChairIcon } from '../../assets/icons/chair.svg';
import { Search } from '../search';
import { ReactComponent as QuoteIcon } from '../../assets/icons/quote.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { SCREENS } from '../../containers/router/constants';

export const Navbar = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(SCREENS.HOME);
  };

  return (
    <div className="nav-wrapper">
      <div className="sub-nav-wrapper ">
        <div onClick={goHome} className="nav-logo-wrapper">
          <ChairIcon className="nav-chair-icon" />
          <div className="nav-logo-title">Comforty</div>
        </div>
        <Search />
        <div className="search-buttons-wrapper">
          <div className="search-button unique-search-button">
            <QuoteIcon />
            <div className="search-button-text">Cart</div>
            <div className="search-cart-couter">2</div>
          </div>
          <div className="search-button">
            <HeartIcon />
          </div>
          <div className="search-button">
            <ProfileIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
