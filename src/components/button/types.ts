export interface IButtonProps {
  onClick: () => void;
  wrapperClass?: string;
  textClass?: React.CSSProperties;
  text: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
