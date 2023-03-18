import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';
import {
  deleteProductCart,
  updateCartProductCount,
} from '../../../../services/cart-service/cart.service';
import { ProductCounter } from '../../../product-page/components/product-counter';
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
}: ICartProductProps) => {
  const [countOfProduct, setCountOfProduct] = useState(count);
  const [isChangingCartProductCount, setIsChanginCartProductCount] = useState(false);
  const { setCart } = useContext(CartContext);
  const [isProductLoading, setIsProductLoading] = useState(false);

  const navigate = useNavigate();

  const handlePlus = async () => {
    if (isChangingCartProductCount) return;
    setIsChanginCartProductCount(true);
    await updateCartProductCount({
      cartProductId: id,
      productCount: countOfProduct + 1,
      cartId,
    });
    setCountOfProduct(prev => prev + 1);
    setIsChanginCartProductCount(false);
  };

  const handleMinus = async () => {
    if (isChangingCartProductCount) return;
    setIsChanginCartProductCount(true);
    await updateCartProductCount({
      cartProductId: id,
      productCount: countOfProduct - 1,
      cartId,
    });
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

  return (
    <div className={`cart-product-wrapper ${isProductLoading && 'cart-product-loading-wrapper'}`}>
      <img onClick={handleNavigateToProduct} className="cart-product-img" src={img} />
      <div className="cart-product-text-content-wrapper">
        <div className="cart-product-title-wrapper">
          <h2 onClick={handleNavigateToProduct} className="cart-product-title">
            {title}
          </h2>
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
          {<h3 className="cart-product-price">{price * countOfProduct}грн</h3>}
        </div>
      </div>
    </div>
  );
};
