import { IButtonProps } from './types';

import './styles.css';

export const Button = ({
  onClick,
  wrapperClass,
  textClass,
  text,
  icon,
  disabled,
}: IButtonProps) => {
  return (
    <div
      className={`main-buton-wrapper ${wrapperClass} ${disabled && 'disabled-button'}`}
      onClick={disabled ? () => {} : onClick}
    >
      {icon && <div className="button-icon-wrapper">{icon}</div>}
      <span className={`main-button-text ${textClass}`}>{text}</span>
    </div>
  );
};
