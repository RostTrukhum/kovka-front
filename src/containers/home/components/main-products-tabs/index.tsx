import { useContext, useMemo } from 'react';
import { ProductTypesContext } from '../../../admin-panel/context';
import './style.css';
import { IMainProductsTabsProps, PRODUCT_TABS } from './types';

export const MainProductsTabs = ({ activeTab, handleActiveTab }: IMainProductsTabsProps) => {
  const { productTypes } = useContext(ProductTypesContext);

  const productTabs = useMemo(
    () => [{ title: 'Усі', type: 'all', _id: 'all' }, ...productTypes],
    [productTypes],
  );

  return (
    <div className="product-tabs-wrapper">
      {productTabs.map(productType => (
        <div
          key={productType._id}
          className={`product-tab ${productType.type === activeTab && 'product-tab-active'}`}
          onClick={handleActiveTab(productType.type as PRODUCT_TABS)}
        >
          <span
            className={`product-tab-text ${
              productType.type === activeTab && 'product-tab-text-active'
            }`}
          >
            {productType.title}
          </span>
        </div>
      ))}
    </div>
  );
};
