import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Footer } from '../../components/footer';
import { FooterPaging } from '../../components/footer-paging';
// import { MainButton } from '../../components/main-button';
import { MainHeader } from '../../components/main-header';
import { FETCH_PRODUCT_LIMIT } from '../../constants';
import { ProductsContext } from '../../context/products';
import { useProducts } from '../../hooks/productsHook';
// import { getProducts } from '../../services/admin-panel-service/admin-panel.service';
import { IProduct } from '../../services/admin-panel-service/types';
import { ProductTypesContext } from '../admin-panel/context';
import { MainProductCard } from '../home/components/main-product-card';
import './style.css';

export const Category = () => {
  const [skip, setSkip] = useState(0);
  const { type, subtype } = useParams();

  const { getProducts } = useProducts();
  const handleGetProducts = () => {
    return getProducts({
      filter: {
        type,
        ...(subtype !== 'all' && { subtype }),
        limit: FETCH_PRODUCT_LIMIT,
        skip: skip,
      },
    });
  };

  const [products, setProducts] = useState<IProduct[]>(handleGetProducts().products);
  // const [isLoading, setIsLoading] = useState(false);
  const { productTypes } = useContext(ProductTypesContext);
  // const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const { isLoading } = useContext(ProductsContext);

  const activeTitle =
    productTypes
      .find(productType => productType.type === type)
      ?.subtypes.find(productSubtype => productSubtype.subtype === subtype)?.title ||
    productTypes.find(productType => productType.type === type)?.title;

  const fetchProducts = async () => {
    // setIsLoading(true);
    const products = handleGetProducts();

    const productsCount = getProducts({
      filter: { type, ...(subtype !== 'all' && { subtype }) },
    }).products.length;

    // setSkip(FETCH_PRODUCT_LIMIT);
    setProducts(products.products);
    setTotalCount(productsCount);
    // setIsLoading(false);
  };

  // const handleLoadMore = async () => {
  //   if (totalCount <= skip) {
  //     return;
  //   }

  //   setIsLoadingMore(true);
  //   const newProducts = await getProducts({
  //     filter: { type, ...(subtype !== 'all' && { subtype }), limit: FETCH_PRODUCT_LIMIT, skip },
  //   });
  //   products && newProducts && setProducts([...products, ...newProducts?.products]);
  //   setSkip(skip + FETCH_PRODUCT_LIMIT);
  //   typeof newProducts?.totalCount === 'number' && setTotalCount(newProducts?.totalCount);
  //   setIsLoadingMore(false);
  // };

  useEffect(() => {
    fetchProducts();
  }, [type, subtype, isLoading, skip]);

  useEffect(() => {
    setSkip(0);
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
        <FooterPaging setSkip={setSkip} productsCount={totalCount} skip={skip} />
        {/* {totalCount > skip && (
          <MainButton
            onClick={handleLoadMore}
            customWrapperClass={`main-product-cards-load-more-button button ${
              isLoadingMore && 'main-product-cards-load-more-button-disabled'
            }`}
            text="Загрузити ще"
            disabled={isLoadingMore}
            isLoading={isLoadingMore}
          />
        )} */}
      </div>
      {!isLoading && <Footer />}
    </div>
  );
};
