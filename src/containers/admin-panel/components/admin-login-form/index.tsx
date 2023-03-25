import { useState } from 'react';
import { MainButton } from '../../../../components/main-button';
import { IAdminLoginFormProps } from './types';

import './style.css';

export const AdminLoginForm = ({ handleSetPassword }: IAdminLoginFormProps) => {
  const [password, setPassword] = useState('');

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="admin-login-form-wrapper">
      <div className="admin-login-form">
        <h1 className="admin-login-form-title ">Адмін панель</h1>
        <span className="admin-login-password-input-title">Пароль</span>
        <input
          onChange={handleChangePassword}
          value={password}
          placeholder="Пароль"
          className="admin-login-password-input"
        />
        <MainButton
          customWrapperClass="admin-login-button-wrapper"
          onClick={handleSetPassword(password)}
          text="Ввійти"
        />
      </div>
    </div>
  );
};
