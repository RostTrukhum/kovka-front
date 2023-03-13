import { useState } from 'react';
import { ProductCounter } from '../../../product-page/components/product-counter';
import './style.css';
import { ICartProductProps } from './types';

export const CartProduct = ({
  title,
  subtype,
  type,
  price,
  id,
  productId,
  img,
  count,
}: ICartProductProps) => {
  const [countOfProduct, setCountOfProduct] = useState(count);

  const handlePlus = () => {
    setCountOfProduct(prev => prev + 1);
  };

  const handleMinus = () => {
    setCountOfProduct(prev => prev - 1);
  };

  return (
    <div className="cart-product-wrapper">
      <img className="cart-product-img" src={img} />
      <div className="cart-product-text-content-wrapper">
        <h2 className="cart-product-title">{title}</h2>
        <div className="cart-product-price-wrapper">
          <ProductCounter
            customWrapperClass="cart-product-counter-wrapper"
            count={countOfProduct}
            handleMinus={handleMinus}
            handlePlus={handlePlus}
          />
          <h3 className="cart-product-price">{price}грн</h3>
        </div>
      </div>
    </div>
  );
};
