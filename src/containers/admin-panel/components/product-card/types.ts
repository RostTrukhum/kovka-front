export interface IProductCardProps {
  id?: string;
  title: string;
  price: number;
  img: string;
  refetchProductsCallBack?: (isReloading?: boolean) => Promise<void>;
  buttonText?: string;
  handleSubmit?: (prop?: any) => Promise<void>;
  onCloseModal?: () => void;
  type: string;
  subtype: string;
  description: string;
  height: number;
  width: number;
}
