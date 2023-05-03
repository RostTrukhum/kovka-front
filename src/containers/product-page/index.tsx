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
import { PRODUCT_SUBTYPES, PRODUCT_TYPES } from '../../types';
import { calculateForegroundPrice } from '../../utils';
import { CartContext } from '../cart/context';
import { DeliveryLabel } from './components/delivery-label';
import { ProductCounter } from './components/product-counter';
import { ProductSpecificationTabs } from './components/product-specification-tabs';
import './style.css';
import { DOOR_CLASSES, DOOR_OPENING_TYPES } from './types';
import { Store } from 'react-notifications-component';
import { DOOR_CLASSES_DESCRIPTION } from './constants';

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

  const isPolymerDoor = product?.description.split(' ')?.[0] === 'Технічні';

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
    if (doorClass === DOOR_CLASSES.STANDART && !isPolymerDoor) {
      return 1.1;
    }

    if (doorClass === DOOR_CLASSES.PRESTIGE) {
      return isPolymerDoor ? 1.1 : 1.2;
    }

    return 1;
  }, [doorClass, isPolymerDoor]);

  const showAddToCardMessage = () => {
    Store.addNotification({
      title: 'Дякуємо!',
      message: 'Ваш товар доданий у кошик',
      type: 'success',
      insert: 'top',
      container: 'top-left',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  };

  const handleAddToCart = async () => {
    if (!productId) {
      return;
    }

    const cartProduct = {
      productId,
      productCount,
      ...(product?.subtype !== PRODUCT_SUBTYPES.BENCHES && {
        productHeight: height,
        productWidth: width,
      }),
      ...(product?.type === PRODUCT_TYPES.DOORS && { doorClass, doorOpeningType }),
      ...(product?.type === PRODUCT_TYPES.DOORS && { markUpInProcents: doorMarkUpPriceByType }),
      ...(activeOutsidePad && { outsidePad: activeOutsidePad }),
      ...(activeIndoorPad && { indoorPad: activeIndoorPad }),
    };

    if (!localStorage.getItem('cart_id')) {
      setIsAddingToCart(true);
      setIsLoadingCart(true);
      const cart = await createCart(cartProduct);
      cart && setCart(cart);
      showAddToCardMessage();
      setIsLoadingCart(false);
      setIsAddingToCart(false);
      return;
    }

    setIsAddingToCart(true);
    setIsLoadingCart(true);
    const newCart = await addToCart({
      cartId: cart._id,
      ...cartProduct,
    });
    newCart && setCart(newCart);
    showAddToCardMessage();
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

  const doorDescription = useMemo(() => {
    return DOOR_CLASSES_DESCRIPTION.find(
      description => description.title.split(' ')[0] === doorClass.split(' ')[0],
    );
  }, [doorClass]);

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
    if (isPolymerDoor) {
      setDoorClass(DOOR_CLASSES.STANDART);
    }
  }, [isPolymerDoor]);

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
                } ${
                  product?.type === PRODUCT_TYPES.FORGED_PRODUCTS && 'product-foreground-page-photo'
                }`}
                src={product?.img}
              ></img>
            </div>
            <div className="product-page-content-description">
              <h1 className="product-page-title">{product?.title}</h1>
              {product?.type === PRODUCT_TYPES.DOORS && (
                <div className="product-page-type-of-doors-main-wrapper">
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
                      {!isPolymerDoor && <option value={DOOR_CLASSES.ECONOMY}>Економ клас</option>}
                      <option value={DOOR_CLASSES.STANDART}>Стандарт клас</option>
                      <option value={DOOR_CLASSES.PRESTIGE}>Престиж клас</option>
                    </select>
                  </div>
                  <p>
                    <strong className="product-page-door-classes-description">
                      {doorDescription?.title}
                    </strong>
                    {doorDescription?.description}
                  </p>
                </div>
              )}

              {product?.description !== ' ' && (
                <textarea
                  style={{ height: descriptionHeight }}
                  disabled={true}
                  value={product?.description}
                  className="product-page-description"
                />
              )}
              {product?.type === PRODUCT_TYPES.DOORS && <DeliveryLabel />}
              {product?.subtype !== PRODUCT_SUBTYPES.BENCHES && (
                <SizeInputs
                  setHeight={handleChangeHeight}
                  setWidth={handleChangeWidth}
                  width={width}
                  height={height}
                />
              )}
              <ProductCounter
                handleMinus={handleMinus}
                handlePlus={handlePlus}
                count={productCount}
              />
              <span className="product-page-price">
                {updatedPrice}
                грн
                {product?.type === PRODUCT_TYPES.FORGED_PRODUCTS &&
                  product?.subtype !== PRODUCT_SUBTYPES.BENCHES &&
                  '/м²'}
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
              {product?.type === PRODUCT_TYPES.DOORS && (
                <p className="product-page-pods-label">
                  Перед покупкою, Ви можете обрати колір накладок дверей у розділі "Кольори
                  накладок", або обговороти це в подальшому з нашим консультантом
                </p>
              )}
            </div>
          </>
        )}
      </div>
      {product?.type === PRODUCT_TYPES.DOORS && (
        <ProductSpecificationTabs
          activeIndoorPad={activeIndoorPad}
          setActiveIndoorPad={setActiveIndoorPad}
          activeOutsidePad={activeOutsidePad}
          setActiveOutsidePad={setActiveOutsidePad}
          isPolymer={isPolymerDoor}
        />
      )}

      {!isLoading && <Footer />}
      <CallBackModal
        cartPrice={updatedPrice}
        products={[
          {
            product: {
              ...product!,
              price: isOutSizedDoor ? product?.price! * 0.99 : product?.price!,
            },
            ...(activeIndoorPad && { indoorPad: activeIndoorPad }),
            ...(activeOutsidePad && { outsidePad: activeOutsidePad }),
            count: productCount,
            ...(product?.subtype !== PRODUCT_SUBTYPES.BENCHES && { width, height }),
            ...(product?.type === PRODUCT_TYPES.DOORS && {
              class: doorClass,
              markUpInProcents: doorMarkUpPriceByType,
              openingType: doorOpeningType,
            }),
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
