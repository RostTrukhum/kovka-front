import { Modal } from '../modal';
import { ICallBackModal } from './types';
import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg';

import './style.css';
import { MainButton } from '../main-button';
import { sendCallBack, sendCartCallBack } from '../../services/home-service/home.service';
import { useContext, useEffect, useState } from 'react';
import { deleteCart } from '../../services/cart-service/cart.service';
import { CartContext } from '../../containers/cart/context';

export const CallBackModal = ({ isVisible, onClose, products, cartPrice }: ICallBackModal) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendedCallBack, setIsSendedCallBack] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const handleCartCallBack = async () => {
    if (products && cartPrice) {
      await sendCartCallBack({ products, totalPrice: cartPrice, phoneNumber });
      await deleteCart({ cartId: cart?._id });
      setCart({ _id: '', products: [] });
    }
  };

  const handleCallBack = async () => {
    setIsLoading(true);
    products ? await handleCartCallBack() : await sendCallBack({ phoneNumber });
    setIsSendedCallBack(true);
    setIsLoading(false);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    if (isSendedCallBack) {
      setTimeout(() => {
        onClose();
        setIsSendedCallBack(false);
      }, 4000);
    }
  }, [isSendedCallBack]);

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="call-back-modal-wrapper">
        <div onClick={onClose} className="call-back-cross-wrapper">
          <CrossIcon />
        </div>
        <div className="call-back-modal-content-wrapper">
          <span className="call-back-modal-title">
            {isSendedCallBack
              ? "Наш менеджер зв'яжеться з вами у найближчий час"
              : 'Зворотній дзвінок'}
          </span>
          {!isSendedCallBack && (
            <>
              <input
                onChange={handleChangePhoneNumber}
                placeholder="Номер телефору"
                className="call-back-modal-input"
              />
              <MainButton
                disabled={!phoneNumber || isLoading}
                isLoading={isLoading}
                customWrapperClass="call-back-modal-button"
                text="Зворотній дзвінок"
                onClick={handleCallBack}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
