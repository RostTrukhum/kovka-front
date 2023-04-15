import './style.css';
import { IProductDoorPadProps } from './types';
import { ReactComponent as CheckIcon } from '../../../../assets/icons/check.svg';

export const ProductDoorPad = ({
  image,
  title,
  activeIndoorPad,
  setActiveIndoorPad,
  activeOutsidePad,
  setActiveOutsidePad,
  isIndoorPad,
}: IProductDoorPadProps) => {
  const handleSelectActivePad = () => {
    isIndoorPad ? setActiveIndoorPad(title) : setActiveOutsidePad(title);
  };

  const isActive = isIndoorPad ? activeIndoorPad === title : activeOutsidePad === title;

  return (
    <div onClick={handleSelectActivePad} className="product-door-pad-wrapper">
      <img src={image} />
      <span className="product-door-pad-text">{title}</span>
      {isActive && <CheckIcon className="product-door-pad-active-icon" />}
    </div>
  );
};
