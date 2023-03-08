import { HashRouter, Route, Routes } from 'react-router-dom';
import { AdminPanel } from '../admin-panel';
import { ProductTypesState } from '../admin-panel/context';
import { Category } from '../category';
import { Home } from '../home';
import { SCREENS } from './constants';

export const Router = () => {
  return (
    <ProductTypesState>
      <HashRouter>
        <Routes>
          <Route path={SCREENS.HOME} element={<Home />} />
          <Route path={SCREENS.ADMIN_PANEL} element={<AdminPanel />} />
          <Route path={SCREENS.CATEGORY}>
            <Route path={SCREENS.EXACT_CATEGORY} element={<Category />}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </ProductTypesState>
  );
};
