import { IProductCardProps } from './types';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ReactComponent as PenIcon } from '../../../../assets/icons/pen.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';
import {
  deleteProduct,
  updateProduct,
  uploadProductImage,
} from '../../../../services/admin-panel-service/admin-panel.service';
import { UPLOAD_PHOTO_BACKEND_KEY } from '../../../../constants';
import { Button } from '../../../../components/button';
import UploadPhotoBanner from '../../../../assets/images/upload-photo-placeholder.jpg';

import './style.css';
import { ProductTypesContext } from '../../context';

export const ProductCard = ({
  img,
  title,
  price,
  id,
  refetchProductsCallBack,
  buttonText,
  handleSubmit,
  onCloseModal,
  type,
  subtype,
}: IProductCardProps) => {
  const [productTitle, setProductTitle] = useState(title);
  const [productPrice, setProductPrice] = useState(price);
  const [productImage, setProductImage] = useState(img);
  const [isReloadingProducts, setIsReloadingProducts] = useState(false);
  const { productTypes } = useContext(ProductTypesContext);
  const [productType, setProductType] = useState(type || productTypes[0]?.type);
  const [productSubtype, setProductSubtype] = useState(
    subtype || productTypes[0]?.subtypes[0].subtype,
  );

  const activeSubtypes = useMemo(() => {
    return productTypes
      .map(type => {
        return type?.subtypes.filter(() => type.type === productType);
      })
      .flat(1);
  }, [productType]);

  const handleChangeProductType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductType(e.target.value);
  };

  const handleChangeProductSubtype = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductSubtype(e.target.value);
  };

  const checkForAnyUpdates = () => {
    if (
      !productTitle ||
      !productPrice ||
      !productImage ||
      isReloadingProducts ||
      productImage === UploadPhotoBanner
    ) {
      return false;
    }

    if (
      productTitle !== title ||
      productPrice !== price ||
      productImage !== img ||
      productType !== type ||
      productSubtype !== subtype
    ) {
      return true;
    }
  };

  const handleUpdateProduct = async () => {
    if (checkForAnyUpdates()) {
      if (handleSubmit) {
        setIsReloadingProducts(true);

        await handleSubmit({
          title: productTitle,
          price: productPrice,
          img: productImage,
          type: productType,
          subtype: productSubtype,
        });
        refetchProductsCallBack && (await refetchProductsCallBack(true));
        onCloseModal && onCloseModal();
        setIsReloadingProducts(false);
      }

      if (id) {
        setIsReloadingProducts(true);
        await updateProduct({
          title: productTitle,
          price: productPrice,
          img: productImage,
          type: productType,
          subtype: productSubtype,
          id,
        });
        refetchProductsCallBack && (await refetchProductsCallBack(true));
        setIsReloadingProducts(false);
      }
    }
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = new RegExp(/^\d+$/);

    const isAvalible = reg.test(e.target.value) || !e.target.value;

    isAvalible && setProductPrice(Number(e.target.value));
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductTitle(e.target.value);
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const formdata = new FormData();
    formdata.append('key', UPLOAD_PHOTO_BACKEND_KEY);
    formdata.append('image', file);
    const uploadedPhoto = await uploadProductImage({ image: formdata });

    setProductImage(uploadedPhoto);
  };

  const handleDeleteProduct = async () => {
    if (id) {
      await deleteProduct({ id });
      refetchProductsCallBack && (await refetchProductsCallBack(true));
    }
  };

  useEffect(() => {
    setProductSubtype(activeSubtypes[0].subtype);
  }, [productType]);

  return (
    <div className="product-card-wrapper">
      <div>
        <img className="product-card-img" src={productImage} alt={productImage} />
      </div>
      <div className="product-card-input-wrapper">
        <span className="product-card-title">Назва:</span>
        <input
          onChange={handleChangeTitle}
          value={`${productTitle}`}
          placeholder={'Назва'}
          className="product-card-input"
        />
      </div>
      <div className="product-card-input-wrapper ">
        <span className="product-card-title">Ціна:</span>
        <input
          onChange={handleChangePrice}
          value={`${productPrice}`}
          placeholder={'Ціна'}
          className="product-card-input"
        />
        <span className="product-card-title">грн</span>
      </div>
      <div className="product-card-input-wrapper ">
        <span className="product-card-title">тип:</span>
        <select onChange={handleChangeProductType} className="product-card-select">
          {productTypes.map(type => (
            <option selected={type.type === productType} key={type._id} value={type.type}>
              {type.title}
            </option>
          ))}
        </select>
      </div>
      <div className="product-card-input-wrapper ">
        <span className="product-card-title">підтип:</span>
        <select
          onChange={handleChangeProductSubtype}
          defaultValue={productSubtype}
          className="product-card-select"
        >
          {activeSubtypes.map(subtype => (
            <option
              selected={subtype.subtype === productSubtype}
              key={subtype._id}
              value={subtype.subtype}
            >
              {subtype.title}
            </option>
          ))}
        </select>
      </div>
      <input onChange={handleChangeImage} className="product-card-edit-input" type={'file'} />
      <div className="product-card-edit-button-wrapper">
        <PenIcon width={20} height={20} />
      </div>
      {!handleSubmit && (
        <div onClick={handleDeleteProduct} className="product-card-delete-button-wrapper">
          <TrashIcon fill="white" width={20} height={20} />
        </div>
      )}
      <Button
        onClick={handleUpdateProduct}
        wrapperClass="product-card-save-button"
        text={buttonText || (isReloadingProducts ? 'Обновляється...' : 'Обновити')}
        disabled={!checkForAnyUpdates()}
      />
    </div>
  );
};
