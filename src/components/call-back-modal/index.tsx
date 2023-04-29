import { Modal } from '../modal';
import { ICallBackModal } from './types';
import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg';

import { MainButton } from '../main-button';
import { sendCallBack, sendCartCallBack } from '../../services/home-service/home.service';
import { useContext, useEffect, useState } from 'react';
import { deleteCart } from '../../services/cart-service/cart.service';
import { CartContext } from '../../containers/cart/context';
import InputMask from 'react-input-mask';

import './style.css';
import { Messangers } from '../messangers';

export const CallBackModal = ({
  isVisible,
  onClose,
  products,
  cartPrice,
  deletingCart = true,
}: ICallBackModal) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendedCallBack, setIsSendedCallBack] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const customClose = () => {
    setPhoneNumber('');
    onClose();
  };

  const handleCartCallBack = async () => {
    if (products && cartPrice) {
      await sendCartCallBack({
        products,
        totalPrice: cartPrice,
        phoneNumber: phoneNumber.replace(/[^0-9]+/g, ''),
      });
      deletingCart && (await deleteCart({ cartId: cart?._id }));
      deletingCart && setCart({ _id: '', products: [] });
    }
  };

  const handleCallBack = async () => {
    setIsLoading(true);
    products
      ? await handleCartCallBack()
      : await sendCallBack({ phoneNumber: phoneNumber.replace(/[^0-9]+/g, '') });
    setIsSendedCallBack(true);
    setIsLoading(false);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    if (isSendedCallBack) {
      setTimeout(() => {
        customClose();
        setIsSendedCallBack(false);
      }, 4000);
    }
  }, [isSendedCallBack]);

  const isPhoneNumberFull =
    typeof Number(phoneNumber.split('')[18]) === 'number' &&
    !isNaN(Number(phoneNumber.split('')[18]));

  return (
    <Modal isVisible={isVisible} onClose={customClose}>
      <div className="call-back-modal-wrapper">
        <div onClick={customClose} className="call-back-cross-wrapper">
          <CrossIcon />
        </div>
        <div className="call-back-modal-content-wrapper">
          <span className="call-back-modal-title">
            {isSendedCallBack
              ? "Наш менеджер зв'яжеться з вами у найближчий час"
              : `${products ? 'Оформлення замовлення' : 'Зворотній дзвінок'}`}
          </span>
          {!isSendedCallBack && (
            <>
              <InputMask
                onChange={handleChangePhoneNumber}
                value={phoneNumber}
                placeholder="Номер телефору"
                className="call-back-modal-input"
                mask={'+38 (999) 999 99 99'}
              />
              <MainButton
                disabled={!phoneNumber || !isPhoneNumberFull || isLoading}
                isLoading={isLoading}
                customWrapperClass="call-back-modal-button"
                text={products ? 'Оформити замовлення' : 'Зворотній дзвінок'}
                onClick={handleCallBack}
              />
            </>
          )}
          {!products && !isSendedCallBack && <Messangers isRow />}
        </div>
      </div>
    </Modal>
  );
};
