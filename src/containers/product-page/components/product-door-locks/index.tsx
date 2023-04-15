import { DoorLocks } from '../../constants';
import { DoorHandles } from '../door-handles';
import { ProductDoorLock } from '../product-door-lock';
import './style.css';

export const ProductDoorLocks = () => {
  return (
    <div className="product-door-locks-wrapper">
      {DoorLocks.map((lock, i) => {
        return <ProductDoorLock key={i} locks={lock.locks} title={lock.title} />;
      })}
      <DoorHandles />
    </div>
  );
};
