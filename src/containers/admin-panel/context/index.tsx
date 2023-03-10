import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductTypes } from '../../../services/admin-panel-service/admin-panel.service';
import { IProductType } from '../../../services/admin-panel-service/types';
import { IProductTypes, IProductTypesState } from './types';

const initialValues = {
  productTypes: [],
  setProductTypes: () => null,
};

export const ProductTypesContext = createContext<IProductTypesState>(initialValues);

export const ProductTypesState = ({ children }: IProductTypes) => {
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const { pathname } = useLocation();

  const handleFetchProductTypes = async () => {
    const productTypes = await getProductTypes();
    productTypes && setProductTypes(productTypes);
  };

  useEffect(() => {
    handleFetchProductTypes();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ProductTypesContext.Provider value={{ productTypes, setProductTypes }}>
      {children}
    </ProductTypesContext.Provider>
  );
};
