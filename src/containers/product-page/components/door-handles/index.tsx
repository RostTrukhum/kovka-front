import { DoorHandlesData } from '../../constants';
import './style.css';

export const DoorHandles = () => {
  return (
    <div>
      <h2>Ручки</h2>
      <div className="door-handles-content-wrapper">
        {DoorHandlesData.map((handle, i) => {
          return (
            <div key={i} className="door-handle-wrapper">
              <img className="door-handle-photo" src={handle.image} />
              <span>{handle.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
