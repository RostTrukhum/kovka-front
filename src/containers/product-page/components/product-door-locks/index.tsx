import { ProductDoorLock } from '../product-door-lock';
import './style.css';

export const ProductDoorLocks = () => {
  return (
    <div className="product-door-locks-wrapper">
      <ProductDoorLock />
      <ProductDoorLock />
    </div>
  );
};
