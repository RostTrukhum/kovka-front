import { useEffect, useState } from 'react';
import { productSpecificationTabs } from '../../constants';
import { ReactComponent as EmptyRightArrowIcon } from '../../../../assets/icons/empty-right-arrow.svg';
import { ProductDoorConstruction } from '../product-door-construction';
import { ProductDoorLocks } from '../product-door-locks';
import { ProductDoorPads } from '../product-door-pads';
import './style.css';
import { IProductSpecificationTabsProps } from './types';
import { ProductDoorGuarantee } from '../product-door-guarantee';

export const ProductSpecificationTabs = ({
  activeIndoorPad,
  setActiveIndoorPad,
  activeOutsidePad,
  setActiveOutsidePad,
  isPolymer,
}: IProductSpecificationTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActiveTabs, setMobileActiveTabs] = useState<Number[]>([]);

  const handleIsMobile = () => {
    window.innerWidth > 600 && isMobile && setIsMobile(false);
    window.innerWidth <= 600 && !isMobile && setIsMobile(true);
  };

  window.addEventListener('resize', handleIsMobile);

  useEffect(() => {
    handleIsMobile();
  }, []);

  const productSpecificationComponentsTabs = [
    {
      component: <ProductDoorConstruction />,
    },
    {
      component: (
        <ProductDoorPads
          isPolymer={isPolymer}
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
    {
      component: <ProductDoorGuarantee />,
    },
  ];

  const handleActiveTab = (activeTabIndex: number) => () => {
    if (!isMobile) {
      setMobileActiveTabs([activeTabIndex]);
      return setActiveTab(activeTabIndex);
    }

    const isActiveMobileTab = mobileActiveTabs.find(tab => tab === activeTabIndex);

    if (isMobile && typeof isActiveMobileTab === 'number') {
      return setMobileActiveTabs(mobileActiveTabs.filter(tab => tab !== activeTabIndex));
    }

    return setMobileActiveTabs([...mobileActiveTabs, activeTabIndex]);
  };

  return (
    <>
      <div className="product-page-tabs-wrapper">
        {productSpecificationTabs.map((tab, i) => {
          return (
            <div key={i}>
              <div
                className={`product-specification-tab ${
                  (isMobile ? mobileActiveTabs.some(tab => tab === i) : i === activeTab) &&
                  'product-specification-tab-active'
                }`}
                onClick={handleActiveTab(i)}
              >
                <span
                  className={`product-specification-tab-text ${
                    (isMobile ? mobileActiveTabs.some(tab => tab === i) : i === activeTab) &&
                    'product-specification-tab-text-active'
                  }`}
                >
                  {tab.title}
                </span>
                {isMobile && (
                  <EmptyRightArrowIcon
                    className={`categories-modal-category-list-item-arrow ${
                      mobileActiveTabs.some(tab => tab === i) &&
                      'categories-modal-category-list-item-arrow-opened'
                    }`}
                    width={10}
                    height={10}
                  />
                )}
              </div>
              {(isMobile ? mobileActiveTabs.some(tab => tab === i) : i === activeTab) && (
                <div className="product-page-small-tab-content">
                  {productSpecificationComponentsTabs[i].component}
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
