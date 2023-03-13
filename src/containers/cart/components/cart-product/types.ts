import { ICreateCartResponceProduct } from '../../../../services/cart-service/types';

export interface ICartProductProps {
  id: string;
  title: string;
  price: number;
  img: string;
  type: string;
  subtype: string;
  productId: string;
  count: number;
}
