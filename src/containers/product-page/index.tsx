import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { MainButton } from '../../components/main-button';
import { MainHeader } from '../../components/main-header';
import { getProductById } from '../../services/admin-panel-service/admin-panel.service';
import { IProduct } from '../../services/admin-panel-service/types';
import { addToCart, createCart } from '../../services/cart-service/cart.service';
import { CartContext } from '../cart/context';
import { ProductCounter } from './components/product-counter';
import './style.css';

export const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();
  const [productCount, setProductCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { cart, setCart, setIsLoading: setIsLoadingCart } = useContext(CartContext);

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
      });
      cart && setCart(cart);
      setIsLoadingCart(false);
      setIsAddingToCart(false);
      return;
    }

    setIsAddingToCart(true);
    setIsLoadingCart(true);
    const newCart = await addToCart({ cartId: cart._id, productId, productCount });
    newCart && setCart(newCart);
    setIsLoadingCart(false);
    setIsAddingToCart(false);
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
                <p>{product?.description}</p>
              </div>
              <span className="product-page-price">{product?.price} грн</span>
              <ProductCounter
                handleMinus={handleMinus}
                handlePlus={handlePlus}
                count={productCount}
              />
              <MainButton
                customWrapperClass="product-page-cart-button"
                onClick={handleAddToCart}
                text="Add to cart"
                disabled={isAddingToCart}
                isLoading={isAddingToCart}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
