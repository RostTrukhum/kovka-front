import { PRODUCT_TABS } from '../../containers/home/components/main-products-tabs/types';

export interface IFooterPagingProps {
  productsCount: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  skip: number;
  setActiveTab?: React.Dispatch<React.SetStateAction<PRODUCT_TABS>>;
}
