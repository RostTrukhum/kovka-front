import { IMainButtonProps } from './types';

import './style.css';

export const MainButton = ({
  text,
  customWrapperClass,
  icon,
  onClick,
  disabled,
}: IMainButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`main-button-wrapper ${customWrapperClass} ${disabled && 'main-button-disabled'}`}
    >
      <span className="main-button-text">{text}</span>
      {icon && icon}
    </button>
  );
};
