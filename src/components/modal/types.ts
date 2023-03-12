export interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  customClass?: string;
}
