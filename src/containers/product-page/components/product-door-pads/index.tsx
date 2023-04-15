import { ProductDoorInsidePods, ProductDoorOutsidePods } from '../../constants';
import { ProductDoorPad } from '../product-door-pad';
import { IProductSpecificationTabsProps } from '../product-specification-tabs/types';
import './style.css';

export const ProductDoorPads = ({
  activeIndoorPad,
  setActiveIndoorPad,
  activeOutsidePad,
  setActiveOutsidePad,
}: IProductSpecificationTabsProps) => {
  return (
    <div className="product-door-pads-main-wrapper">
      <div className="product-door-pads-wrapper">
        <h2 className="product-door-pads-title">Виберіть зовнішній колір (термостійка плівка):</h2>
        <div className="product-door-pads-content-wrapper">
          {ProductDoorOutsidePods.map(pod => (
            <ProductDoorPad
              activeIndoorPad={activeIndoorPad}
              setActiveIndoorPad={setActiveIndoorPad}
              activeOutsidePad={activeOutsidePad}
              setActiveOutsidePad={setActiveOutsidePad}
              title={pod.title}
              image={pod.image}
            />
          ))}
        </div>
      </div>
      <div className="product-door-pads-wrapper">
        <h2 className="product-door-pads-title">Виберіть внутрішній колір:</h2>
        <div className="product-door-pads-content-wrapper">
          {ProductDoorInsidePods.map(pod => (
            <ProductDoorPad
              activeIndoorPad={activeIndoorPad}
              setActiveIndoorPad={setActiveIndoorPad}
              activeOutsidePad={activeOutsidePad}
              setActiveOutsidePad={setActiveOutsidePad}
              title={pod.title}
              image={pod.image}
              isIndoorPad
            />
          ))}
        </div>
      </div>
    </div>
  );
};
