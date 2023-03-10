import { Button } from '../../../../components/button';
import { ReactComponent as PlusButton } from '../../../../assets/icons/plus-button.svg';
import { ReactComponent as CartIcon } from '../../../../assets/icons/cart.svg';
import { useState } from 'react';
import { AddProductModal } from '../add-product-modal';
import { INavBarProps } from './types';

import './styles.css';
import { useNavigate } from 'react-router-dom';
import { SCREENS } from '../../../router/constants';

export const NavBar = ({ refetchProducts }: INavBarProps) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const navigate = useNavigate();

  const handleTriggerAddProductModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  const goHome = () => {
    navigate(SCREENS.HOME);
  };

  return (
    <div className="admin-nav-wrapper">
      <div onClick={goHome} className="nav-title-wrapper">
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
