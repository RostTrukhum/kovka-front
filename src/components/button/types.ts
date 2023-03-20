export interface IButtonProps {
  onClick: () => void;
  wrapperClass?: string;
  textClass?: string;
  text: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
