import { useState } from 'react';
import { productSpecificationTabs } from '../../constants';
import { ProductDoorConstruction } from '../product-door-construction';
import { ProductDoorLocks } from '../product-door-locks';
import { ProductDoorPads } from '../product-door-pads';
import './style.css';
import { IProductSpecificationTabsProps } from './types';

export const ProductSpecificationTabs = ({
  activeIndoorPad,
  setActiveIndoorPad,
  activeOutsidePad,
  setActiveOutsidePad,
}: IProductSpecificationTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const productSpecificationComponentsTabs = [
    {
      component: <ProductDoorConstruction />,
    },
    {
      component: (
        <ProductDoorPads
          activeIndoorPad={activeIndoorPad}
          setActiveIndoorPad={setActiveIndoorPad}
          activeOutsidePad={activeOutsidePad}
          setActiveOutsidePad={setActiveOutsidePad}
        />
      ),
    },
    {
      component: <ProductDoorLocks />,
    },
  ];

  const handleActiveTab = (activeTabIndex: number) => () => {
    setActiveTab(activeTabIndex);
  };

  return (
    <>
      <div className="product-page-tabs-wrapper">
        {productSpecificationTabs.map((tab, i) => {
          return (
            <div key={i}>
              <div
                className={`product-tab ${i === activeTab && 'product-tab-active'}`}
                onClick={handleActiveTab(i)}
              >
                <span
                  className={`product-tab-text ${i === activeTab && 'product-tab-text-active'}`}
                >
                  {tab.title}
                </span>
              </div>
              {i === activeTab && (
                <div className="product-page-small-tab-content">
                  {productSpecificationComponentsTabs[activeTab].component}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {
        <div className="product-page-big-tab-content">
          {productSpecificationComponentsTabs[activeTab].component}
        </div>
      }
    </>
  );
};
