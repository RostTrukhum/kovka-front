export interface IAddProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  refetchProducts: () => Promise<void>;
}
