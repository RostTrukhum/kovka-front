import { IProductSubtype, IProductType } from '../../../services/admin-panel-service/types';

export interface IProductTypesState {
  productTypes: IProductType[];
  setProductTypes: React.Dispatch<React.SetStateAction<IProductType[]>>;
  productSubtypes: IProductSubtype[];
  setProductSubtypes: React.Dispatch<React.SetStateAction<IProductSubtype[]>>;
}

export interface IProductTypes {
  children: React.ReactNode;
}
