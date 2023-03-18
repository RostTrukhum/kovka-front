import { createContext, useEffect, useState } from 'react';
import { getCart } from '../../../services/cart-service/cart.service';
import { ICart, ICartContext, ICartState } from './types';

const initialValues = {
  cart: {
    _id: '',
    amount: 0,
    products: [],
  },
  setCart: () => null,
  isLoading: false,
  setIsLoading: () => null,
};

export const CartContext = createContext<ICartState>(initialValues);

export const CartState = ({ children }: ICartContext) => {
  const [cart, setCart] = useState<ICart>(initialValues.cart);
  const [isLoading, setIsLoading] = useState(false);

  const cartId = localStorage.getItem('cart_id');

  const handleFetchInitialCart = async () => {
    if (cartId) {
      setIsLoading(true);
      const cart = await getCart({ cartId });
      cart && setCart(cart);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await handleFetchInitialCart();
    })();
  }, []);

  return (
    <CartContext.Provider value={{ isLoading, setIsLoading, cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
