import { IProduct } from '../../../../services/admin-panel-service/types';

export interface IProductCardsProps {
  isLoading: boolean;
  products: IProduct[];
  fetchProducts: (isRefetching?: boolean) => Promise<void>;
}
