import { useEffect } from 'react';
import { IModalProps } from './types';

import './styles.css';

export const Modal = ({ isVisible, onClose, children, customClass }: IModalProps) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isVisible]);

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div onClick={onClose} className="modal-wrapper">
      <div onClick={handleStopPropagation} className={`modal-content-wrapper ${customClass}`}>
        {children}
      </div>
    </div>
  );
};
