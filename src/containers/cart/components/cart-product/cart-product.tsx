import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';
import {
  deleteProductCart,
  updateCartProductCount,
} from '../../../../services/cart-service/cart.service';
import { PRODUCT_TYPES } from '../../../../types';
import { calculateForegroundPrice } from '../../../../utils';
import { ProductCounter } from '../../../product-page/components/product-counter';
import { DOOR_OPENING_TYPES } from '../../../product-page/types';
import { SCREENS } from '../../../router/constants';
import { CartContext } from '../../context';
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
  cartId,
  cartHeight,
  cartWidth,
  productHeight,
  productWidth,
  doorClass,
  openingType,
  markUpInProcents,
  indoorPad,
  outsidePad,
}: ICartProductProps) => {
  const [countOfProduct, setCountOfProduct] = useState(count);
  const [isChangingCartProductCount, setIsChanginCartProductCount] = useState(false);
  const { setCart } = useContext(CartContext);
  const [isProductLoading, setIsProductLoading] = useState(false);

  const navigate = useNavigate();

  const handlePlus = async () => {
    if (isChangingCartProductCount) return;
    setIsChanginCartProductCount(true);
    const updatedCart = await updateCartProductCount({
      cartProductId: id,
      productCount: countOfProduct + 1,
      cartId,
      productHeight: cartHeight,
      productWidth: cartWidth,
    });
    updatedCart && setCart(updatedCart);
    setCountOfProduct(prev => prev + 1);
    setIsChanginCartProductCount(false);
  };

  const handleMinus = async () => {
    if (isChangingCartProductCount) return;
    setIsChanginCartProductCount(true);
    const updatedCart = await updateCartProductCount({
      cartProductId: id,
      productCount: countOfProduct - 1,
      cartId,
      productHeight: cartHeight,
      productWidth: cartWidth,
    });
    updatedCart && setCart(updatedCart);
    setCountOfProduct(prev => prev - 1);
    setIsChanginCartProductCount(false);
  };

  const handleDeleteProduct = async () => {
    setIsProductLoading(true);
    const updatedCart = await deleteProductCart({ cartId, cartProductId: id });
    updatedCart && setCart(updatedCart);
    setIsProductLoading(false);
  };

  const handleNavigateToProduct = () => {
    navigate(`${SCREENS.PRODUCT_PAGE}/${productId}`);
  };

  const productPrice = Math.ceil(
    calculateForegroundPrice({ price: price, height: cartHeight, width: cartWidth }) *
      countOfProduct *
      (markUpInProcents || 1),
  );

  const updatedPrice =
    (productHeight !== cartHeight || productWidth !== cartWidth) && type === PRODUCT_TYPES.DOORS
      ? Math.ceil(productPrice * 0.99)
      : productPrice;

  return (
    <div className={`cart-product-wrapper ${isProductLoading && 'cart-product-loading-wrapper'}`}>
      <img
        onClick={handleNavigateToProduct}
        className={`cart-product-img ${
          openingType === DOOR_OPENING_TYPES.LEFT && 'product-door-left-opening-photo'
        } `}
        src={img}
      />
      <div className="cart-product-text-content-wrapper">
        <div className="cart-product-title-wrapper">
          <div className="cart-product-title-subwrapper">
            <h2 onClick={handleNavigateToProduct} className="cart-product-title">
              {title}
            </h2>
            {cartWidth && <span className="cart-products-measures">Ширина: {cartWidth} мм</span>}
            {cartHeight && <span className="cart-products-measures">Висота: {cartHeight} мм</span>}
            {doorClass && <span className="cart-products-measures">Клас: {doorClass}</span>}
            {openingType && (
              <span className="cart-products-measures">Відкривання: {openingType}</span>
            )}
            {outsidePad && (
              <span className="cart-products-measures">Зовнішня накладка: {outsidePad}</span>
            )}
            {indoorPad && (
              <span className="cart-products-measures">Внутрішня накладка: {indoorPad}</span>
            )}
          </div>
          <TrashIcon
            onClick={handleDeleteProduct}
            className="cart-trash-wrapper"
            width={25}
            height={25}
          />
        </div>
        <div className="cart-product-price-wrapper">
          <ProductCounter
            customWrapperClass="cart-product-counter-wrapper"
            count={countOfProduct}
            handleMinus={handleMinus}
            handlePlus={handlePlus}
            isLoading={isChangingCartProductCount}
          />
          {<h3 className="cart-product-price">{updatedPrice} грн</h3>}
        </div>
      </div>
    </div>
  );
};
