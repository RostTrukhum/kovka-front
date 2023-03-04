import { useEffect, useState, CSSProperties } from 'react';
import { FETCH_PRODUCT_LIMIT } from '../../../../constants';
import { getProducts } from '../../../../services/admin-panel-service/admin-panel.service';
import { IProduct } from '../../../../services/admin-panel-service/types';
import { MainProductCard } from '../main-product-card';
import { MainProductsTabs } from '../main-products-tabs';
import { PRODUCT_TABS } from '../main-products-tabs/types';
import ClipLoader from 'react-spinners/ClipLoader';

import './style.css';
import { MainButton } from '../../../../components/main-button';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

export const MainProductCardList = () => {
  const [activeTab, setActiveTab] = useState(PRODUCT_TABS.ALL);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const handleActiveProductType = (tab: PRODUCT_TABS) => () => {
    setActiveTab(tab);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    const products = await getProducts({
      filter:
        activeTab !== PRODUCT_TABS.ALL
          ? { type: activeTab, limit: FETCH_PRODUCT_LIMIT, skip: 0 }
          : { limit: FETCH_PRODUCT_LIMIT, skip: 0 },
    });
    products && setProducts(products?.products);
    setSkip(FETCH_PRODUCT_LIMIT);
    typeof products?.totalCount === 'number' && setTotalCount(products?.totalCount);
    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    if (totalCount <= skip) {
      return;
    }

    setIsLoadingMore(true);
    const newProducts = await getProducts({
      filter:
        activeTab !== PRODUCT_TABS.ALL
          ? { type: activeTab, limit: FETCH_PRODUCT_LIMIT, skip }
          : { limit: FETCH_PRODUCT_LIMIT, skip },
    });
    products && newProducts && setProducts([...products, ...newProducts?.products]);
    setSkip(skip + FETCH_PRODUCT_LIMIT);
    typeof newProducts?.totalCount === 'number' && setTotalCount(newProducts?.totalCount);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    (async () => {
      await fetchProducts();
    })();
  }, [activeTab]);

  return (
    <div className="main-product-cards-list-wrapper">
      <span className="main-product-cards-list-title">Our Products</span>
      <MainProductsTabs activeTab={activeTab} handleActiveTab={handleActiveProductType} />
      <ClipLoader
        color={'#029FAE'}
        loading={Boolean(isLoading)}
        cssOverride={override}
        size={100}
      />
      <div className="main-product-cards-list">
        {products.length &&
          products.map(product => (
            <MainProductCard
              key={product._id}
              title={product.title}
              price={product.price}
              isAddedToCard={false}
              img={product.img}
            />
          ))}
        {!products?.length && !isLoading && (
          <div className="main-product-cards-empty-list">
            <span className="main-product-cards-empty-list-text">Немає продуктів</span>
          </div>
        )}
      </div>
      {totalCount > skip && (
        <MainButton
          onClick={handleLoadMore}
          customWrapperClass={`main-product-cards-load-more-button button ${
            isLoadingMore && 'main-product-cards-load-more-button-disabled'
          }`}
          text="Загрузити ще"
          disabled={isLoadingMore}
        />
      )}
    </div>
  );
};
