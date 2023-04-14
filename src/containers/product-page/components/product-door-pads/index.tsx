import { ProductDoorInsidePods, ProductDoorOutsidePods } from '../../constants';
import { ProductDoorPad } from '../product-door-pad';
import './style.css';

export const ProductDoorPads = () => {
  return (
    <div className="product-door-pads-main-wrapper">
      <div className="product-door-pads-wrapper">
        <h2 className="product-door-pads-title">Виберіть зовнішній колір (термостійка плівка):</h2>
        <div className="product-door-pads-content-wrapper">
          {ProductDoorOutsidePods.map(pod => (
            <ProductDoorPad title={pod.title} image={pod.image} />
          ))}
        </div>
      </div>
      <div className="product-door-pads-wrapper">
        <h2 className="product-door-pads-title">Виберіть внутрішній колір:</h2>
        <div className="product-door-pads-content-wrapper">
          {ProductDoorInsidePods.map(pod => (
            <ProductDoorPad title={pod.title} image={pod.image} />
          ))}
        </div>
      </div>
    </div>
  );
};
