import { ICartProduct } from '../../../services/cart-service/types';

export interface ICart {
  _id: string;
  products: ICartProduct[];
}

export interface ICartState {
  cart: ICart;
  setCart: React.Dispatch<React.SetStateAction<ICart>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICartContext {
  children: React.ReactNode;
}
