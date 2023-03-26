import { ProductCard } from '../product-card';

import './styles.css';
import { IProductCardsProps } from './types';

export const ProductCards = ({ isLoading, products, fetchProducts }: IProductCardsProps) => {
  return (
    <div className="product-cards-wrapper">
      {isLoading && <h2>Загрузка...</h2>}

      {Boolean(!products?.length && !isLoading) && <h2>Немає продуктів</h2>}

      {!isLoading &&
        products.map(product => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.title}
            img={product.img}
            price={product.price}
            refetchProductsCallBack={fetchProducts}
            type={product?.type}
            subtype={product?.subtype}
            description={product?.description}
            height={product?.height}
            width={product?.width}
          />
        ))}
    </div>
  );
};
