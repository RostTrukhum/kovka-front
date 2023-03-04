import { Button } from '../../../../components/button';
import { ReactComponent as PlusButton } from '../../../../assets/icons/plus-button.svg';
import { ReactComponent as CartIcon } from '../../../../assets/icons/cart.svg';
import { useState } from 'react';
import { AddProductModal } from '../add-product-modal';
import { INavBarProps } from './types';

import './styles.css';

export const NavBar = ({ refetchProducts }: INavBarProps) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleTriggerAddProductModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  return (
    <div className="admin-nav-wrapper">
      <div className="nav-title-wrapper">
        <div className="cart-icon-wrapper">
          <CartIcon />
        </div>
        <span className="nav-title">Продукти</span>
      </div>
      <Button
        onClick={handleTriggerAddProductModal}
        text={'Добавити продукт'}
        icon={<PlusButton />}
      />
      <AddProductModal
        refetchProducts={refetchProducts}
        isVisible={isVisibleModal}
        onClose={handleTriggerAddProductModal}
      />
    </div>
  );
};
