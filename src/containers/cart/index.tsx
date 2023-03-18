import { useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import { MainHeader } from '../../components/main-header';
import { CartProduct } from './components/cart-product/cart-product';
import { CartContext } from './context';

import './style.css';

export const Cart = () => {
  const { cart, isLoading } = useContext(CartContext);

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
        </div>
      </div>
    </>
  );
};
