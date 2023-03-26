import { Modal } from '../../../../components/modal';
import { ProductCard } from '../product-card';
import { IAddProductModalProps } from './types';
import UploadPhotoPlaceholder from '../../../../assets/images/upload-photo-placeholder.jpg';
import { createProduct } from '../../../../services/admin-panel-service/admin-panel.service';

export const AddProductModal = ({ isVisible, onClose, refetchProducts }: IAddProductModalProps) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <ProductCard
        title={''}
        img={UploadPhotoPlaceholder}
        price={0}
        buttonText={'Створити продукт'}
        handleSubmit={createProduct}
        refetchProductsCallBack={refetchProducts}
        onCloseModal={onClose}
        type=""
        subtype=""
        description=""
        height={1000}
        width={1000}
      />
    </Modal>
  );
};
