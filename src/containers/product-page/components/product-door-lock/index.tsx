import './style.css';
import { IProductDoorLockProps } from './types';

export const ProductDoorLock = ({ title, locks }: IProductDoorLockProps) => {
  return (
    <div className="product-door-lock-main-wrapper">
      <h2 className="product-door-lock-title">{title}</h2>
      <div className="product-door-lock-list">
        {locks?.map((lock, i) => {
          return (
            <div key={i} className="product-door-lock-content-wrapper">
              <img className="product-door-lock-image" src={lock?.img} />
              <div className="product-door-lock-subcontent-wrapper">
                <span className="product-door-lock-name">{lock?.name}</span>
                <div className="product-door-lock-content-list">
                  {lock?.typeLock && (
                    <div className="product-door-lock-content-list-item">
                      <div>Тип замка</div>
                      <div>{lock?.typeLock}</div>
                    </div>
                  )}
                  {lock?.typeMechanism && (
                    <div className="product-door-lock-content-list-item">
                      <div>Тип механізму</div>
                      <div>{lock?.typeMechanism}</div>
                    </div>
                  )}
                  {lock?.countOfScroll && (
                    <div className="product-door-lock-content-list-item">
                      <div>Кількість оборотів</div>
                      <div>{lock?.countOfScroll}</div>
                    </div>
                  )}
                  {lock?.coutOfBolts && (
                    <div className="product-door-lock-content-list-item">
                      <div>Кількість ригелів</div>
                      <div>{lock?.coutOfBolts}</div>
                    </div>
                  )}
                  {lock?.classOfSecurity && (
                    <div className="product-door-lock-content-list-item">
                      <div>Клас безпеки</div>
                      <div>{lock?.classOfSecurity}</div>
                    </div>
                  )}
                  {lock?.reverseBar && (
                    <div className="product-door-lock-content-list-item">
                      <div>Зворотня планка</div>
                      <div>{lock?.reverseBar}</div>
                    </div>
                  )}
                  {lock?.countOfCombinations && (
                    <div className="product-door-lock-content-list-item">
                      <div>Кількість комбінацій</div>
                      <div>{lock?.countOfCombinations}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
