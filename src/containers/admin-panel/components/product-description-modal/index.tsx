import { Modal } from '../../../../components/modal';
import { IProductDescriptionModal } from './types';
import { Button } from '../../../../components/button';
import { useState } from 'react';
import { ReactComponent as CrossIcon } from '../../../../assets/icons/cross.svg';

import './style.css';

export const ProductDescriptionModal = ({
  isVisible,
  onClose,
  description,
  setDescription,
}: IProductDescriptionModal) => {
  const [productDescription, setProductDescription] = useState(description);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductDescription(e.target.value);
  };

  const handleSave = () => {
    productDescription !== description && setDescription(productDescription);
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="product-description-wrapper">
        <CrossIcon onClick={onClose} className="product-description-cross" />
        <textarea
          className="product-description-text-area"
          value={productDescription}
          onChange={handleChange}
          placeholder="Опис продукту"
        />
        <Button
          disabled={!productDescription}
          text={`${productDescription === description ? 'Вийти' : 'Зберегти'}`}
          onClick={handleSave}
        />
      </div>
    </Modal>
  );
};
