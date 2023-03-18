export interface IProductCounterProps {
  handleMinus: () => void;
  handlePlus: () => void;
  count: number;
  customWrapperClass?: string;
  isLoading?: boolean;
}
