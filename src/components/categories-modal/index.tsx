import { ReactComponent as EmptyRightArrowIcon } from '../../assets/icons/empty-right-arrow.svg';
import { ReactComponent as EmptyLeftArrowIcon } from '../../assets/icons/empty-left-arrow.svg';

import './style.css';
import { useContext, useState } from 'react';
import { ICategoriesModalProps } from './types';
import { ProductTypesContext } from '../../containers/admin-panel/context';
import { useNavigate } from 'react-router-dom';
import { SCREENS } from '../../containers/router/constants';
import { Messangers } from '../messangers';
import { NavPhoneNumbers } from '../nav-phone-numbers';

export const CategoriesModal = ({ isVisible, onClose }: ICategoriesModalProps) => {
  const [activeCategories, setActiveCategories] = useState<String[]>([]);
  const { productTypes } = useContext(ProductTypesContext);
  const navigate = useNavigate();

  const handleAddActiveCategory = (id: string) => () => {
    const isDeletingCategory = activeCategories.find(category => category === id);

    if (isDeletingCategory) {
      return setActiveCategories(activeCategories.filter(category => category !== id));
    }

    setActiveCategories([...activeCategories, id]);
  };

  const handleShowSubcategoriesList = (id: string) => {
    return activeCategories.some(category => category === id);
  };

  const handleNavigateCategory = (type: string, subtype: string) => () => {
    navigate(`${SCREENS.CATEGORY}/${type}/${subtype}`);
    onClose();
    setActiveCategories([]);
  };

  return (
    <div className={`categories-modal-wrapper ${isVisible && 'categories-modal-wrapper-opened'}`}>
      <div className="categories-modal-title-wrapper">
        <EmptyLeftArrowIcon onClick={onClose} cursor={'pointer'} width={20} height={20} />
        <p className="categories-modal-title">Каталог</p>
      </div>
      <div className="categories-modal-content-wrapper">
        <div>
          {productTypes.map(({ title, subtypes, _id, type }) => (
            <ul key={_id} className="categories-modal-category-list-wrapper">
              <div
                onClick={handleAddActiveCategory(title)}
                className="categories-modal-category-list-title"
              >
                {title}
                <EmptyRightArrowIcon
                  className={`categories-modal-category-list-item-arrow ${
                    handleShowSubcategoriesList(title) &&
                    'categories-modal-category-list-item-arrow-opened'
                  }`}
                  width={10}
                  height={10}
                />
              </div>
              {handleShowSubcategoriesList(title) && (
                <li
                  key={_id}
                  onClick={handleNavigateCategory(type, 'all')}
                  className="categories-modal-category-list-item"
                >
                  Усі продукти
                </li>
              )}

              {handleShowSubcategoriesList(title) &&
                subtypes.map(({ title, _id, subtype }) => (
                  <li
                    key={_id}
                    onClick={handleNavigateCategory(type, subtype)}
                    className="categories-modal-category-list-item"
                  >
                    {title}
                  </li>
                ))}
            </ul>
          ))}
        </div>
        <div className="categories-modal-messangers">
          <NavPhoneNumbers />
          <Messangers isRow />
        </div>
      </div>
    </div>
  );
};
