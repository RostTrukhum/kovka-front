import { createContext, useEffect, useState } from 'react';
import {
  getProductSubtypes,
  getProductTypes,
} from '../../../services/admin-panel-service/admin-panel.service';
import { IProductSubtype, IProductType } from '../../../services/admin-panel-service/types';
import { IProductTypes, IProductTypesState } from './types';

const initialValues = {
  productTypes: [],
  setProductTypes: () => null,
  productSubtypes: [],
  setProductSubtypes: () => null,
};

export const ProductTypesContext = createContext<IProductTypesState>(initialValues);

export const ProductTypesState = ({ children }: IProductTypes) => {
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const [productSubtypes, setProductSubtypes] = useState<IProductSubtype[]>([]);

  const handleFetchProductTypes = async () => {
    const productTypes = await getProductTypes();
    const productSubtypes = await getProductSubtypes();
    productTypes && setProductTypes(productTypes);
    productSubtypes && setProductSubtypes(productSubtypes);
  };

  useEffect(() => {
    handleFetchProductTypes();
  }, []);

  return (
    <ProductTypesContext.Provider
      value={{ productTypes, setProductTypes, productSubtypes, setProductSubtypes }}
    >
      {children}
    </ProductTypesContext.Provider>
  );
};
