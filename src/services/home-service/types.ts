import { ICartProduct } from '../cart-service/types';

export interface ISendCallBackVariables {
  phoneNumber: string;
}

export interface ISendCartCallBackVariables {
  products: ICartProduct[];
  phoneNumber: string;
  totalPrice: number;
}
