import { useEffect, useState } from 'react';
import { ADMIN_PASSWORD } from '../../constants';
import { getProducts } from '../../services/admin-panel-service/admin-panel.service';
import { IProduct } from '../../services/admin-panel-service/types';
import { AdminLoginForm } from './components/admin-login-form';
import { NavBar } from './components/nav-bar';
import { ProductCards } from './components/product-cards';

import './style.css';

export const AdminPanel = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(localStorage.getItem('admin-password'));

  const fetchProducts = async (isRefetching?: boolean) => {
    !isRefetching && setIsLoading(true);
    const products = await getProducts({});
    products && setProducts(products?.products);
    !isRefetching && setIsLoading(false);
  };

  const handleSetPassword = (password: string) => () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin-password', password);
      setPassword(password);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (password !== ADMIN_PASSWORD) {
    return <AdminLoginForm handleSetPassword={handleSetPassword} />;
  }

  return (
    <div className="admin-pannel-wrapper">
      <NavBar refetchProducts={fetchProducts} />
      <ProductCards products={products} isLoading={isLoading} fetchProducts={fetchProducts} />
    </div>
  );
};
