import { FETCH_PRODUCT_LIMIT } from '../../constants';
import { IFooterPagingProps } from './types';

import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PRODUCT_TABS } from '../../containers/home/components/main-products-tabs/types';

export const FooterPaging = ({
  setSkip,
  productsCount,
  skip,
  setActiveTab,
}: IFooterPagingProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangePage = (index: number) => {
    setSkip(index * FETCH_PRODUCT_LIMIT);
    window.scrollTo(0, 0);
    navigate(location.pathname, {
      state: {
        ...location.state,
        page: index,
      },
    });
  };

  useEffect(() => {
    if (location.state) {
      location.state?.page && setSkip(location.state?.page * FETCH_PRODUCT_LIMIT);
      setActiveTab && location.state?.tab && setActiveTab(location.state?.tab as PRODUCT_TABS);
    }
  }, [location.state]);

  if (productsCount < FETCH_PRODUCT_LIMIT) {
    return null;
  }

  return (
    <div className="footer-paging-wrapper">
      {Array(Math.ceil(productsCount / FETCH_PRODUCT_LIMIT))
        .fill(0)
        .map((_, index) => {
          const isActive = skip / FETCH_PRODUCT_LIMIT === index;

          return (
            <div
              onClick={() => handleChangePage(index)}
              className={`footer-paging-button ${isActive && 'footer-paging-button-active'}`}
              key={index}
            >
              {index + 1}
            </div>
          );
        })}
    </div>
  );
};
