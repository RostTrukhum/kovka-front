import { useContext, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { CallBackModal } from '../../components/call-back-modal';
import { MainButton } from '../../components/main-button';
import { MainHeader } from '../../components/main-header';
import { PRODUCT_TYPES } from '../../types';
import { calculateForegroundPrice } from '../../utils';
import { CartProduct } from './components/cart-product/cart-product';
import { CartContext } from './context';

import './style.css';

export const Cart = () => {
  const { cart, isLoading } = useContext(CartContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let cartPrice = 0;

  cart.products.forEach(product => {
    const productPrice = Math.ceil(
      calculateForegroundPrice({
        price: product?.product?.price,
        height: product?.height,
        width: product?.width,
      }) *
        product.count *
        (product.markUpInProcents || 1),
    );

    const updatedPrice =
      (product?.height !== product?.product?.height ||
        product?.width !== product?.product?.width) &&
      product?.product?.type === PRODUCT_TYPES.DOORS
        ? Math.ceil(productPrice * 0.99)
        : productPrice;

    cartPrice += updatedPrice;
  });

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <MainHeader />
      <div className="cart-content-wrapper">
        <h1 className="cart-title">Кошик</h1>
        <div className="cart-products-wrapper">
          {<ClipLoader className="cart-loader" loading={isLoading} color="#007580" size={100} />}
          {!cart?.products.length && !isLoading && (
            <h2 className="empty-cart-title">Ваш кошик пустий</h2>
          )}
          {!isLoading && (
            <>
              {cart?.products?.map(product => (
                <CartProduct
                  key={product._id}
                  id={product._id}
                  title={product?.product?.title}
                  price={product?.product?.price}
                  img={product?.product?.img}
                  type={product?.product?.type}
                  subtype={product?.product?.subtype}
                  productId={product?.product?._id}
                  count={product?.count}
                  cartId={cart?._id}
                  cartHeight={product?.height}
                  cartWidth={product?.width}
                  productHeight={product?.product?.height}
                  productWidth={product?.product?.width}
                  doorClass={product?.class!}
                  openingType={product?.openingType!}
                  markUpInProcents={product?.markUpInProcents}
                  outsidePad={product?.outsidePad}
                  indoorPad={product?.indoorPad}
                />
              ))}
              <CallBackModal
                cartPrice={cartPrice}
                products={cart?.products}
                isVisible={isModalVisible}
                onClose={handleCloseModal}
              />
            </>
          )}
        </div>
        {!isLoading && !!cart.products.length && (
          <div className="cart-make-order-wrapper">
            <MainButton onClick={handleOpenModal} text="Оформити замовлення" />
            Сума: {cartPrice} грн
          </div>
        )}
      </div>
    </>
  );
};
