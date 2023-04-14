import DoorConstruction from '../../../../assets/images/door-construction.jpg';
import { ProductDoorConstructions } from '../../constants';

import './style.css';

export const ProductDoorConstruction = () => {
  return (
    <div>
      <p className="product-door-construction-title">
        Двері комплектуються двома замками, ручками, лиштвою із зовнішньої сторони та трьома петлями
        на кожну створку. Полотно дверей бронюється з зовнішньої сторони та утеплене пінопластом або
        екструдованим пінополістиролом. На всі металеві компоненти наноситься грунтівка та фарба
        Hammerite™ (виробництво Польща). Додатково можна замовити поріг, накладку з нержавіючого
        металу, вічко, склопакети та ковку, в конструкції дверей де вони відсутні. Декоративні
        накладки можна замовити як з МДФ, так і з полімеру.
      </p>
      <div className="product-door-construction-content-wrapper">
        <img className="product-door-construction-image" src={DoorConstruction}></img>
        <div className="product-door-construction-tables-wrapper">
          {ProductDoorConstructions.map((table, i) => {
            return (
              <table key={i} className="product-door-construction-table">
                <thead>
                  <tr>
                    <th className="product-door-construction-table-title">{table.title}</th>
                  </tr>
                </thead>
                <tbody className="product-door-construction-tbody">
                  {table.tr.map((tr, trIndex) => {
                    return (
                      <tr key={trIndex} className="product-door-construction-tr">
                        {tr.map((td, tdIndex) => {
                          return (
                            <td key={tdIndex} className="product-door-construction-td">
                              <div className="product-door-construction-td-content-wrapper">
                                {!tdIndex && (
                                  <div className="product-door-construction-number-label-wrapper">
                                    {trIndex}
                                  </div>
                                )}
                                <span className="product-door-construction-td-text">
                                  {td.title}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    </div>
  );
};
