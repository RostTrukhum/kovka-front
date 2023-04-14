import './style.css';
import { IProductDoorPadProps } from './types';

export const ProductDoorPad = ({ image, title }: IProductDoorPadProps) => {
  return (
    <div className="product-door-pad-wrapper">
      <img src={image} />
      <span className="product-door-pad-text">{title}</span>
    </div>
  );
};
