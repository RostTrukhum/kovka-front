import { useEffect, useState } from 'react';
import { getProducts } from '../../services/admin-panel-service/admin-panel.service';
import { IProduct } from '../../services/admin-panel-service/types';
import { NavBar } from './components/nav-bar';
import { ProductCards } from './components/product-cards';

import './style.css';

export const AdminPanel = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (isRefetching?: boolean) => {
    !isRefetching && setIsLoading(true);
    const products = await getProducts({});
    products && setProducts(products?.products);
    !isRefetching && setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-pannel-wrapper">
      <NavBar refetchProducts={fetchProducts} />
      <ProductCards products={products} isLoading={isLoading} fetchProducts={fetchProducts} />
    </div>
  );
};
