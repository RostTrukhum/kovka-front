import { CategoriesBar } from '../categories-bar';
import { Navbar } from '../navbar';

import './style.css';

export const MainHeader = () => {
  return (
    <div className="main-header">
      <Navbar />
      <CategoriesBar />
    </div>
  );
};
