import { ReactComponent as EmptyRightArrowIcon } from '../../assets/icons/empty-right-arrow.svg';
import { ReactComponent as EmptyLeftArrowIcon } from '../../assets/icons/empty-left-arrow.svg';

import './style.css';
import { useState } from 'react';
import { ICategoriesModalProps } from './types';

const mockCategories = [
  {
    title: 'Gateway',
    subcategories: [
      {
        title: 'White Gateway',
      },
      {
        title: 'Black Gateway',
      },
      {
        title: 'Caran Gateway',
      },
    ],
  },
  {
    title: 'Doors',
    subcategories: [
      {
        title: 'White Doors',
      },
      {
        title: 'Black Doors',
      },
      {
        title: 'Caran Doors',
      },
    ],
  },
];

export const CategoriesModal = ({ isVisible, onClose }: ICategoriesModalProps) => {
  const [activeCategories, setActiveCategories] = useState<String[]>([]);

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

  return (
    <div className={`categories-modal-wrapper ${isVisible && 'categories-modal-wrapper-opened'}`}>
      <EmptyLeftArrowIcon onClick={onClose} cursor={'pointer'} width={20} height={20} />
      <p className="categories-modal-title">Categories</p>
      {mockCategories.map(({ title, subcategories }) => (
        <ul className="categories-modal-category-list-wrapper">
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

          {handleShowSubcategoriesList(title) &&
            subcategories.map(({ title }) => (
              <li className="categories-modal-category-list-item">{title}</li>
            ))}
        </ul>
      ))}
    </div>
  );
};
