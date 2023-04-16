import { ReactComponent as DeliveryIcon } from '../../../../assets/icons/delivery.svg';

import './style.css';

export const DeliveryLabel = () => {
  return (
    <div className="delivery-label-wrapper">
      <DeliveryIcon width={60} height={60} style={{ objectFit: 'cover' }} />
      <p className="delivery-label-text">
        <span className="delivery-label-generall-text">Безкоштовна доставка по Україні!</span>
        <br></br>
        Службою доставки: <span className="delivery-label-company-name">НОВА ПОШТА</span>
      </p>
    </div>
  );
};
