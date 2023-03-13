import { useContext } from 'react';
import { MainHeader } from '../../components/main-header';
import { CartProduct } from './components/cart-product/cart-product';
import { CartContext } from './context';

import './style.css';

export const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <>
      <MainHeader />
      <div className="cart-content-wrapper">
        <h1 className="cart-title">Кошик</h1>
        <div className="cart-products-wrapper">
          {cart?.products?.map(product => (
            <CartProduct
              key={product._id}
              id={product._id}
              title={product?.title}
              price={product.price}
              img={product?.img}
              type={product?.type}
              subtype={product?.subtype}
              productId={product?.productId}
              count={product?.count}
            />
          ))}
        </div>
      </div>
    </>
  );
};
