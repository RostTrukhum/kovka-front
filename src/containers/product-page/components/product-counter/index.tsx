import { ClipLoader } from 'react-spinners';
import './style.css';
import { IProductCounterProps } from './types';

export const ProductCounter = ({
  count,
  handleMinus,
  handlePlus,
  customWrapperClass,
  isLoading,
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
    <div className="main-product-counter-wrapper">
      <span className="product-counter-title">Кількість</span>
      <div className={`product-counter-wrapper ${customWrapperClass}`}>
        <div onClick={handleCountMinus} className="product-counter-sign">
          —
        </div>
        <div className="product-counter-number">
          {isLoading ? <ClipLoader size={15} loading={isLoading} /> : count}
        </div>
        <div onClick={handleCountPlus} className="product-counter-sign">
          +
        </div>
      </div>
    </div>
  );
};
