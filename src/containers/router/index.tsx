import { HashRouter, Route, Routes } from 'react-router-dom';
import { AdminPanel } from '../admin-panel';
import { ProductTypesState } from '../admin-panel/context';
import { Category } from '../category';
import { Home } from '../home';
import { CartState } from '../cart/context';
import { ProductPage } from '../product-page';
import { SCREENS } from './constants';
import { Cart } from '../cart';

export const Router = () => {
  return (
    <HashRouter>
      <ProductTypesState>
        <CartState>
          <Routes>
            <Route path={SCREENS.HOME} element={<Home />} />
            <Route path={SCREENS.ADMIN_PANEL} element={<AdminPanel />} />
            <Route path={SCREENS.CATEGORY}>
              <Route path={SCREENS.EXACT_CATEGORY} element={<Category />} />
            </Route>
            <Route path={SCREENS.PRODUCT_PAGE}>
              <Route path={SCREENS.PRODUCT} element={<ProductPage />} />
            </Route>
            <Route path={SCREENS.CART} element={<Cart />} />
          </Routes>
        </CartState>
      </ProductTypesState>
    </HashRouter>
  );
};
