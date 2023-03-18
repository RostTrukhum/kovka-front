import { IMainButtonProps } from './types';

import './style.css';
import { ClipLoader } from 'react-spinners';

export const MainButton = ({
  text,
  customWrapperClass,
  icon,
  onClick,
  disabled,
  isLoading,
}: IMainButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`main-button-wrapper ${customWrapperClass} ${disabled && 'main-button-disabled'}`}
    >
      <ClipLoader loading={Boolean(isLoading)} size={20} color="#ffff" />
      {!isLoading && <span className="main-button-text">{text}</span>}
      {icon && !isLoading && icon}
    </button>
  );
};
