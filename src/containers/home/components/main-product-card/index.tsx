import { ReactComponent as WhiteQuoteIcon } from '../../../../assets/icons/white-quote.svg';
import { ReactComponent as QuoteIcon } from '../../../../assets/icons/quote.svg';
import { IMainProductCardProps } from './types';

import './style.css';
import { useNavigate } from 'react-router-dom';
import { SCREENS } from '../../../router/constants';

export const MainProductCard = ({
  img,
  title,
  price,
  isAddedToCard,
  id,
}: IMainProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${SCREENS.PRODUCT_PAGE}/${id}`);
  };

  return (
    <div onClick={handleClick} className="main-product-card-wrapper">
      <img className="main-product-card-img" src={img} alt={img} />
      <div className="main-product-card-data-wrapper">
        <div className="main-product-card-info-wrapper">
          <span className="main-product-card-title">{title}</span>
          <span className="main-product-card-price">{price}$</span>
        </div>
        <div
          className={`main-product-card-cart-button-wrapper ${
            isAddedToCard && 'main-product-card-cart-button-added-wrapper'
          }`}
        >
          {isAddedToCard ? (
            <QuoteIcon width={24} height={24} />
          ) : (
            <WhiteQuoteIcon width={24} height={24} />
          )}
        </div>
      </div>
    </div>
  );
};
