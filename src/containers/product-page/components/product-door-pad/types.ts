import { IProductSpecificationTabsProps } from '../product-specification-tabs/types';

export interface IProductDoorPadProps extends IProductSpecificationTabsProps {
  image: string;
  title: string;
  isIndoorPad?: boolean;
}
