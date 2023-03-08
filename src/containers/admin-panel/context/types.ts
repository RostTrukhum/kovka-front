import { IProductSubtype, IProductType } from '../../../services/admin-panel-service/types';

export interface IProductTypesState {
  productTypes: IProductType[];
  setProductTypes: React.Dispatch<React.SetStateAction<IProductType[]>>;
}

export interface IProductTypes {
  children: React.ReactNode;
}
