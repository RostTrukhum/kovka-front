import './style.css';
import { ISizeInputsProps } from './types';

export const SizeInputs = ({ width, height, setWidth, setHeight }: ISizeInputsProps) => {
  return (
    <div className="size-inputs-wrapper">
      <div>
        <span className="product-counter-title">Ширина</span>
        <div className="size-input-wrapper">
          <input className="size-input" value={width} onChange={setWidth} />
          мм
        </div>
      </div>

      <div>
        <span className="product-counter-title">Висота</span>
        <div className="size-input-wrapper">
          <input className="size-input" value={height} onChange={setHeight} />
          мм
        </div>
      </div>
    </div>
  );
};
