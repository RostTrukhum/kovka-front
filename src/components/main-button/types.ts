export interface IMainButtonProps {
  text: string;
  customWrapperClass?: string;
  icon?: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}
