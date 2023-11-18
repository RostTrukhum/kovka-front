import { createContext, useEffect, useState } from 'react';
import { getProducts } from '../../services/admin-panel-service/admin-panel.service';
import { IProduct } from '../../services/admin-panel-service/types';
import { IProductsContext, IProductsProviderProps } from './types';

export const ProductsContext = createContext<IProductsContext>({
  products: [],
  totalCount: 0,
  isLoading: false,
});

export const ProductsProvider = ({ children }: IProductsProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProducts = async () => {
    setIsLoading(true);
    const products = await getProducts({});
    products?.products && setProducts(products?.products);
    products?.totalCount && setTotalCount(products?.totalCount);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoading, totalCount }}>
      {children}
    </ProductsContext.Provider>
  );
};
