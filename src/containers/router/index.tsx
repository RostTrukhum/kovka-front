import { createBrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { AdminPanel } from '../admin-panel';
import { ProductTypesState } from '../admin-panel/context';
import { Home } from '../home';

export const Router = () => {
  return (
    <ProductTypesState>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Routes>
      </HashRouter>
    </ProductTypesState>
  );
};
