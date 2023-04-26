import {
  ProductDoorInsidePods,
  ProductDoorOutsidePods,
  ProductDoorOutsidePolymerPods,
} from '../../constants';
import { ProductDoorPad } from '../product-door-pad';
import { IProductSpecificationTabsProps } from '../product-specification-tabs/types';
import './style.css';

export const ProductDoorPads = ({
  activeIndoorPad,
  setActiveIndoorPad,
  activeOutsidePad,
  setActiveOutsidePad,
  isPolymer,
}: IProductSpecificationTabsProps) => {
  const outsidePoods = isPolymer ? ProductDoorOutsidePolymerPods : ProductDoorOutsidePods;

  return (
    <div className="product-door-pads-main-wrapper">
      <div className="product-door-pads-wrapper">
        <h2 className="product-door-pads-title">
          {isPolymer
            ? 'Виберіть зовнішній колір (полімерні накладки):'
            : 'Виберіть зовнішній колір (термостійка плівка):'}
        </h2>
        <div className="product-door-pads-content-wrapper">
          {outsidePoods.map((pod, i) => (
            <ProductDoorPad
              key={i}
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
          {ProductDoorInsidePods.map((pod, i) => (
            <ProductDoorPad
              key={i}
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
