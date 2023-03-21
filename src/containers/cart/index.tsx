import { useContext, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { CallBackModal } from '../../components/call-back-modal';
import { Footer } from '../../components/footer';
import { MainButton } from '../../components/main-button';
import { MainHeader } from '../../components/main-header';
import { CartProduct } from './components/cart-product/cart-product';
import { CartContext } from './context';

import './style.css';

export const Cart = () => {
  const { cart, isLoading } = useContext(CartContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let cartPrice = 0;

  cart.products.forEach(product => {
    cartPrice += product.count * product.product.price;
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
            />
          ))}
          <CallBackModal
            cartPrice={cartPrice}
            products={cart?.products}
            isVisible={isModalVisible}
            onClose={handleCloseModal}
          />
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
