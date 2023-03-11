import './style.css';
import { IProductCounterProps } from './types';

export const ProductCounter = ({ count, handleMinus, handlePlus }: IProductCounterProps) => {
  return (
    <div className="product-counter-wrapper">
      <div onClick={handleMinus} className="product-counter-sign">
        —
      </div>
      <div className="product-counter-number">{count}</div>
      <div onClick={handlePlus} className="product-counter-sign">
        +
      </div>
    </div>
  );
};
