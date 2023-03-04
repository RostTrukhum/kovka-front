import { useState } from 'react';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import { CategoriesModal } from '../categories-modal';

import './style.css';

export const CategoriesBar = () => {
  const [isVisibleCategoriesModal, setIsVisibleCategoriesModal] = useState(false);

  const categoriesModalToggler = () => {
    setIsVisibleCategoriesModal(!isVisibleCategoriesModal);
  };

  return (
    <div className="categories-bar-wrapper">
      <div className="categories-bar-sub-wrapper">
        <div className="categories-bar-content">
          <div className="categories-button" onClick={categoriesModalToggler}>
            <MenuIcon />
            All categories
          </div>
          <span className="category-button category-button-active">Home</span>
          <span className="category-button">Shop</span>
          <span className="category-button">Product</span>
          <span className="category-button">Pages</span>
          <span className="category-button">About</span>
        </div>
        <div>
          <span className="category-contact">Contact: </span>
          <span>(808) 555-0111</span>
        </div>
      </div>
      <CategoriesModal isVisible={isVisibleCategoriesModal} onClose={categoriesModalToggler} />
    </div>
  );
};
