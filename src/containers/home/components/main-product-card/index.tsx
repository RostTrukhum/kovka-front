import { ReactComponent as WhiteQuoteIcon } from '../../../../assets/icons/white-quote.svg';
import { IMainProductCardProps } from './types';

import './style.css';
import { useNavigate } from 'react-router-dom';
import { SCREENS } from '../../../router/constants';
import { addToCart, createCart } from '../../../../services/cart-service/cart.service';
import { useContext, useState } from 'react';
import { CartContext } from '../../../cart/context';
import { ClipLoader } from 'react-spinners';

export const MainProductCard = ({
  img,
  title,
  price,
  id,
  type,
  subtype,
}: IMainProductCardProps) => {
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);

  const navigate = useNavigate();

  const { cart, setIsLoading: setIsCartLoading, setCart } = useContext(CartContext);

  const handleClick = () => {
    navigate(`${SCREENS.PRODUCT_PAGE}/${id}`);
  };

  const handleClickAddToCart = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isAddToCartLoading) {
      return;
    }

    e.stopPropagation();

    const product = {
      img,
      title,
      price,
      type,
      subtype,
      createdAt: new Date(),
      productId: id,
      count: 1,
    };

    if (cart._id) {
      setIsAddToCartLoading(true);
      setIsCartLoading(true);
      const newCart = await addToCart({
        id: cart._id,
        product: product,
      });
      if (newCart) {
        setCart(newCart);
      } else {
        const cart = await createCart({ product });
        cart && setCart(cart);
      }
      setIsCartLoading(false);
      setIsAddToCartLoading(false);
    } else {
      setIsAddToCartLoading(true);

      setIsCartLoading(true);
      const cart = await createCart({ product });
      cart && setCart(cart);
      setIsCartLoading(false);
      setIsAddToCartLoading(false);
    }
  };

  return (
    <div onClick={handleClick} className="main-product-card-wrapper">
      <img className="main-product-card-img" src={img} alt={img} />
      <div className="main-product-card-data-wrapper">
        <div className="main-product-card-info-wrapper">
          <span className="main-product-card-title">{title}</span>
          <span className="main-product-card-price">{price}$</span>
        </div>
        <div onClick={handleClickAddToCart} className={`main-product-card-cart-button-wrapper`}>
          {isAddToCartLoading ? (
            <ClipLoader loading={isAddToCartLoading} size={20} color="#ffff" />
          ) : (
            <WhiteQuoteIcon width={24} height={24} />
          )}
        </div>
      </div>
    </div>
  );
};
