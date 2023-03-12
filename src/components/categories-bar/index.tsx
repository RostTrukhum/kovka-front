import { useState } from 'react';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import { CallBackModal } from '../call-back-modal';
import { CategoriesModal } from '../categories-modal';
import { MainButton } from '../main-button';

import './style.css';

export const CategoriesBar = () => {
  const [isVisibleCategoriesModal, setIsVisibleCategoriesModal] = useState(false);
  const [isVisibleCallBackModal, setIsVisibleCallBackModal] = useState(false);

  const categoriesModalToggler = () => {
    setIsVisibleCategoriesModal(!isVisibleCategoriesModal);
  };

  const handleCallBackModalToggler = () => {
    setIsVisibleCallBackModal(!isVisibleCallBackModal);
  };

  return (
    <div className="categories-bar-wrapper">
      <div className="categories-bar-sub-wrapper">
        <div className="categories-bar-content">
          <div className="categories-button" onClick={categoriesModalToggler}>
            <MenuIcon />
            All categories
          </div>
          {/* <span className="category-button category-button-active">Home</span>
          <span className="category-button">Shop</span>
          <span className="category-button">Product</span>
          <span className="category-button">Pages</span>
          <span className="category-button">About</span> */}
        </div>
        <MainButton onClick={handleCallBackModalToggler} text="Замовити дзвінок" />
      </div>
      <CategoriesModal isVisible={isVisibleCategoriesModal} onClose={categoriesModalToggler} />
      <CallBackModal isVisible={isVisibleCallBackModal} onClose={handleCallBackModalToggler} />
    </div>
  );
};
