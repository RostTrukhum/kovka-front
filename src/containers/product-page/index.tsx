import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Footer } from '../../components/footer';
import { MainButton } from '../../components/main-button';
import { MainHeader } from '../../components/main-header';
import { SizeInputs } from '../../components/size-inputs';
import { getProductById } from '../../services/admin-panel-service/admin-panel.service';
import { IProduct } from '../../services/admin-panel-service/types';
import { addToCart, createCart } from '../../services/cart-service/cart.service';
import { PRODUCT_TYPES } from '../../types';
import { calculateForegroundPrice } from '../../utils';
import { CartContext } from '../cart/context';
import { ProductCounter } from './components/product-counter';
import './style.css';

export const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();
  const [productCount, setProductCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { cart, setCart, setIsLoading: setIsLoadingCart } = useContext(CartContext);
  const [descriptionHeight, setDescriptionHeight] = useState(100);
  const [width, setWidth] = useState(product?.width || 1000);
  const [height, setHeight] = useState(product?.height || 1000);

  const { productId } = useParams<{ productId: string }>();

  const handlePlus = () => {
    setProductCount(prev => prev + 1);
  };

  const handleMinus = () => {
    setProductCount(prev => prev - 1);
  };

  const handleAddToCart = async () => {
    if (!productId) {
      return;
    }

    if (!localStorage.getItem('cart_id')) {
      setIsAddingToCart(true);
      setIsLoadingCart(true);
      const cart = await createCart({
        productId,
        productCount,
        productHeight: height,
        productWidth: width,
      });
      cart && setCart(cart);
      setIsLoadingCart(false);
      setIsAddingToCart(false);
      return;
    }

    setIsAddingToCart(true);
    setIsLoadingCart(true);
    const newCart = await addToCart({
      cartId: cart._id,
      productId,
      productCount,
      productWidth: width,
      productHeight: height,
    });
    newCart && setCart(newCart);
    setIsLoadingCart(false);
    setIsAddingToCart(false);
  };

  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = new RegExp(/^\d+$/);

    const isAvalible = reg.test(e.target.value) || !e.target.value;

    isAvalible && setWidth(Number(e.target.value));
  };

  const handleChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = new RegExp(/^\d+$/);

    const isAvalible = reg.test(e.target.value) || !e.target.value;

    isAvalible && setHeight(Number(e.target.value));
  };

  const productPrice =
    calculateForegroundPrice({ price: product?.price!, height, width }) * productCount;

  const updatedPrice =
    (width !== product?.width || height !== product?.height) &&
    product?.type === PRODUCT_TYPES.DOORS
      ? Math.ceil(productPrice * 0.99)
      : productPrice;

  useEffect(() => {
    if (productId) {
      (async () => {
        setIsLoading(true);
        const product = await getProductById({ id: productId });
        setProduct(product);
        setWidth(product?.width!);
        setHeight(product?.height!);
        setIsLoading(false);
      })();
    }
  }, [productId]);

  useEffect(() => {
    setDescriptionHeight(document.querySelector('.product-page-description')?.scrollHeight!);
  }, [product?.description]);

  return (
    <div className="product-page-wrappe">
      <MainHeader />
      <div className="product-paga-content-wrapper">
        <ClipLoader color="#029FAE" loading={isLoading} size={100} />
        {Boolean(product && !isLoading) && (
          <>
            <div className="product-page-photo-wrapper">
              <img className="product-page-photo" src={product?.img}></img>
            </div>
            <div className="product-page-content-description">
              <h1 className="product-page-title">{product?.title}</h1>
              <textarea
                style={{ height: descriptionHeight }}
                disabled={true}
                value={product?.description}
                className="product-page-description"
              />
              <SizeInputs
                setHeight={handleChangeHeight}
                setWidth={handleChangeWidth}
                width={width}
                height={height}
              />
              <ProductCounter
                handleMinus={handleMinus}
                handlePlus={handlePlus}
                count={productCount}
              />
              <MainButton
                customWrapperClass="product-page-cart-button"
                onClick={handleAddToCart}
                text="Додати до кошика"
                disabled={isAddingToCart}
                isLoading={isAddingToCart}
              />
              <span className="product-page-price">
                {updatedPrice}
                грн
              </span>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
