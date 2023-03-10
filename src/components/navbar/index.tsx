import { ReactComponent as ChairIcon } from '../../assets/icons/chair.svg';
import { Search } from '../search';
import { ReactComponent as QuoteIcon } from '../../assets/icons/quote.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { SCREENS } from '../../containers/router/constants';
import { useContext } from 'react';
import { CartContext } from '../../containers/cart/context';
import { ClipLoader } from 'react-spinners';

export const Navbar = () => {
  const { isLoading: isCartLoading, cart } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate(SCREENS.CART);
  };

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
        <div className="nav-phone-number-wrapper">
          <a className="nav-phone-number" href="tel:+380931107980">
            +38(093)110-79-80
          </a>
          <a className="nav-phone-number" href="tel:+380931107980">
            +38(093)110-79-80
          </a>
        </div>
        <div className="search-buttons-wrapper">
          <div onClick={handleCartClick} className="search-button unique-search-button">
            <QuoteIcon />
            <div className="search-button-text">Cart</div>
            <div className="search-cart-couter">
              {!isCartLoading && cart?.products?.length}
              <ClipLoader loading={isCartLoading} size={5} color="#ffff" />
            </div>
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
