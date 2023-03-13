import './style.css';
import { IProductCounterProps } from './types';

export const ProductCounter = ({
  count,
  handleMinus,
  handlePlus,
  customWrapperClass,
}: IProductCounterProps) => {
  const handleCountPlus = () => {
    if (count === 99) {
      return;
    }
    handlePlus();
  };

  const handleCountMinus = () => {
    if (count === 1) {
      return;
    }

    handleMinus();
  };

  return (
    <div className={`product-counter-wrapper ${customWrapperClass}`}>
      <div onClick={handleCountMinus} className="product-counter-sign">
        —
      </div>
      <div className="product-counter-number">{count}</div>
      <div onClick={handleCountPlus} className="product-counter-sign">
        +
      </div>
    </div>
  );
};
