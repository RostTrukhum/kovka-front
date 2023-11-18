import { IProduct } from '../../services/admin-panel-service/types';

export interface IProductsContext {
  products: IProduct[];
  isLoading: boolean;
  totalCount: number;
}

export interface IProductsProviderProps {
  children: React.ReactNode;
}
