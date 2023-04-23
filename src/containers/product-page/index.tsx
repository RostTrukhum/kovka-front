import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { CallBackModal } from '../../components/call-back-modal';
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
import { DeliveryLabel } from './components/delivery-label';
import { ProductCounter } from './components/product-counter';
import { ProductSpecificationTabs } from './components/product-specification-tabs';
import './style.css';
import { DOOR_CLASSES, DOOR_OPENING_TYPES } from './types';

export const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();
  const [productCount, setProductCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { cart, setCart, setIsLoading: setIsLoadingCart } = useContext(CartContext);
  const [descriptionHeight, setDescriptionHeight] = useState(100);
  const [width, setWidth] = useState(product?.width || 1000);
  const [height, setHeight] = useState(product?.height || 1000);
  const [isBuyProductModalVisible, setIsBuyProductModalVisible] = useState(false);
  const [activeIndoorPad, setActiveIndoorPad] = useState('');
  const [activeOutsidePad, setActiveOutsidePad] = useState('');
  const [doorClass, setDoorClass] = useState(DOOR_CLASSES.ECONOMY);
  const [doorOpeningType, setDoorOpeningType] = useState(DOOR_OPENING_TYPES.RIGHT);

  const handleOpenProductBuyModal = () => {
    setIsBuyProductModalVisible(true);
  };

  const handleCloseProductBuyModal = () => {
    setIsBuyProductModalVisible(false);
  };

  const { productId } = useParams<{ productId: string }>();

  const handlePlus = () => {
    setProductCount(prev => prev + 1);
  };

  const handleMinus = () => {
    setProductCount(prev => prev - 1);
  };

  const doorMarkUpPriceByType = useMemo(() => {
    if (doorClass === DOOR_CLASSES.STANDART) {
      return 1.1;
    }

    if (doorClass === DOOR_CLASSES.PRESTIGE) {
      return 1.2;
    }

    return 1;
  }, [doorClass]);

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
        doorClass,
        doorOpeningType,
        markUpInProcents: doorMarkUpPriceByType,
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
      doorClass,
      doorOpeningType,
      markUpInProcents: doorMarkUpPriceByType,
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

  const handleChangeClassDoor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDoorClass(e.target.value as DOOR_CLASSES);
  };

  const handleChangeDoorOpeningType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDoorOpeningType(e.target.value as DOOR_OPENING_TYPES);
  };

  const productPrice = Math.ceil(
    calculateForegroundPrice({ price: product?.price!, height, width }) *
      productCount *
      doorMarkUpPriceByType,
  );

  const isOutSizedDoor =
    (width !== product?.width || height !== product?.height) &&
    product?.type === PRODUCT_TYPES.DOORS;

  const updatedPrice = isOutSizedDoor ? Math.ceil(productPrice * 0.99) : productPrice;

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
              <img
                className={`product-page-photo ${
                  doorOpeningType === DOOR_OPENING_TYPES.LEFT && 'product-door-left-opening-photo'
                }`}
                src={product?.img}
              ></img>
            </div>
            <div className="product-page-content-description">
              <h1 className="product-page-title">{product?.title}</h1>
              <div className="product-page-type-of-doors-wrapper">
                <select
                  onChange={handleChangeDoorOpeningType}
                  value={doorOpeningType}
                  className="product-page-door-type"
                >
                  <option value={DOOR_OPENING_TYPES.RIGHT}>Відкривання вправо</option>
                  <option value={DOOR_OPENING_TYPES.LEFT}>Відкривання вліво</option>
                </select>
                <select
                  onChange={handleChangeClassDoor}
                  value={doorClass}
                  className="product-page-door-type"
                >
                  <option value={DOOR_CLASSES.ECONOMY}>Економ клас</option>
                  <option value={DOOR_CLASSES.STANDART}>Стандарт клас</option>
                  <option value={DOOR_CLASSES.PRESTIGE}>Престиж клас</option>
                </select>
              </div>

              <textarea
                style={{ height: descriptionHeight }}
                disabled={true}
                value={product?.description}
                className="product-page-description"
              />
              <DeliveryLabel />
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
              <span className="product-page-price">
                {updatedPrice}
                грн
              </span>
              <div className="product-buy-buttons-wrapper">
                <MainButton
                  customWrapperClass="product-page-cart-button product-page-buy-button"
                  onClick={handleOpenProductBuyModal}
                  text="Замовити"
                />
                <MainButton
                  customWrapperClass="product-page-cart-button"
                  onClick={handleAddToCart}
                  text="Додати до кошика"
                  disabled={isAddingToCart}
                  isLoading={isAddingToCart}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <ProductSpecificationTabs
        activeIndoorPad={activeIndoorPad}
        setActiveIndoorPad={setActiveIndoorPad}
        activeOutsidePad={activeOutsidePad}
        setActiveOutsidePad={setActiveOutsidePad}
      />

      <Footer />
      <CallBackModal
        cartPrice={updatedPrice}
        products={[
          {
            product: {
              ...product!,
              price: isOutSizedDoor ? product?.price! * 0.99 : product?.price!,
            },
            markUpInProcents: doorMarkUpPriceByType,
            count: productCount,
            width,
            height,
            class: doorClass,
            openingType: doorOpeningType,
            _id: product?._id!,
          },
        ]}
        deletingCart={false}
        isVisible={isBuyProductModalVisible}
        onClose={handleCloseProductBuyModal}
      />
    </div>
  );
};
