import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { MainButton } from '../../components/main-button';
import { MainHeader } from '../../components/main-header';
import { getProductById } from '../../services/admin-panel-service/admin-panel.service';
import { IProduct } from '../../services/admin-panel-service/types';
import { ProductCounter } from './components/product-counter';
import './style.css';

export const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();
  const [productCount, setProductCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { productId } = useParams<{ productId: string }>();

  const handlePlus = () => {
    if (productCount > 99) {
      return;
    }

    setProductCount(prev => prev + 1);
  };

  const handleMinus = () => {
    if (productCount === 1) {
      return;
    }

    setProductCount(prev => prev - 1);
  };

  useEffect(() => {
    if (productId) {
      (async () => {
        setIsLoading(true);
        const product = await getProductById({ id: productId });
        setProduct(product);
        setIsLoading(false);
      })();
    }
  }, [productId]);

  return (
    <>
      <MainHeader />
      <div className="product-paga-content-wrapper">
        <ClipLoader color="#029FAE" loading={isLoading} size={100} />
        {Boolean(product && !isLoading) && (
          <>
            <div className="product-page-photo-wrapper">
              <img className="product-page-photo" src={product?.img}></img>
            </div>
            <div className="product-page-content-description">
              <div className="product-page-title">{product?.title}</div>
              <div className="product-page-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, obcaecati
                  accusamus quam nemo neque, ipsum nulla quibusdam harum molestiae tenetur commodi
                  sed in est! Veniam odit illo sunt error quasi. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Placeat corporis architecto veniam autem mollitia
                  quasi earum soluta animi! Necessitatibus, dolore praesentium? Consectetur quisquam
                  doloremque autem totam temporibus consequatur corporis accusantium! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. In corporis, soluta cumque nisi vero
                  ipsa ab provident itaque excepturi sint odit maiores natus beatae non minus
                  doloremque distinctio at amet? Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Magni reiciendis error, corrupti laborum perferendis ex. Hic totam commodi
                  dolor beatae tempore harum error incidunt, dicta aliquam maxime, ex aperiam odit.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore est consequatur,
                  delectus itaque enim culpa fugiat, dolorum quasi repellat officia minima sunt
                  perspiciatis obcaecati, consectetur sint odit totam nemo? Vel? Lorem ipsum dolor
                  sit, amet consectetur adipisicing elit. Odit ut assumenda ad earum. Nam, quae ad.
                  Adipisci in assumenda inventore necessitatibus non. Eius placeat tempora
                  perspiciatis a suscipit animi maxime!
                </p>
              </div>
              <span className="product-page-price">{product?.price}$</span>
              <ProductCounter
                handleMinus={handleMinus}
                handlePlus={handlePlus}
                count={productCount}
              />
              <MainButton
                customWrapperClass="product-page-cart-button"
                onClick={() => {}}
                text="Add to cart"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
