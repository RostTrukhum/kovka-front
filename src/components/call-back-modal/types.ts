import { ICartProduct } from '../../services/cart-service/types';

export interface ICallBackModal {
  isVisible: boolean;
  onClose: () => void;
  products?: ICartProduct[];
  cartPrice?: number;
  deletingCart?: boolean;
}
