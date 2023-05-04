import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Footer } from '../../components/footer';
import { MainButton } from '../../components/main-button';
import { MainHeader } from '../../components/main-header';
import { FETCH_PRODUCT_LIMIT } from '../../constants';
import { getProducts } from '../../services/admin-panel-service/admin-panel.service';
import { IProduct } from '../../services/admin-panel-service/types';
import { ProductTypesContext } from '../admin-panel/context';
import { MainProductCard } from '../home/components/main-product-card';
import './style.css';

export const Category = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { productTypes } = useContext(ProductTypesContext);
  const { type, subtype } = useParams();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);

  const activeTitle =
    productTypes
      .find(productType => productType.type === type)
      ?.subtypes.find(productSubtype => productSubtype.subtype === subtype)?.title ||
    productTypes.find(productType => productType.type === type)?.title;

  const fetchProducts = async () => {
    setIsLoading(true);
    const products = await getProducts({
      filter: { type, ...(subtype !== 'all' && { subtype }), limit: FETCH_PRODUCT_LIMIT, skip: 0 },
    });
    setSkip(FETCH_PRODUCT_LIMIT);
    products && setProducts(products.products);
    typeof products?.totalCount === 'number' && setTotalCount(products?.totalCount);
    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    if (totalCount <= skip) {
      return;
    }

    setIsLoadingMore(true);
    const newProducts = await getProducts({
      filter: { type, ...(subtype !== 'all' && { subtype }), limit: FETCH_PRODUCT_LIMIT, skip },
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
  }, [type, subtype]);

  return (
    <div>
      <MainHeader />
      <div className="main-category-wrapper">
        <h1 className="category-title">{activeTitle}</h1>
        <ClipLoader color={'#029FAE'} loading={Boolean(isLoading)} size={100} />
        <div className="category-list-wrapper">
          {Boolean(products) &&
            products.map(product => (
              <MainProductCard
                key={product._id}
                title={product.title}
                price={product.price}
                img={product.img}
                id={product._id}
                type={product?.type}
                subtype={product?.subtype}
                width={product?.width}
                height={product?.height}
                description={product?.description}
              />
            ))}
          {Boolean(!products?.length && !isLoading) && (
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
            isLoading={isLoadingMore}
          />
        )}
      </div>
      {!isLoading && <Footer />}
    </div>
  );
};
