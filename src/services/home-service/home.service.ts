import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { ISendCallBackVariables } from './types';

export const sendCallBack = async ({ phoneNumber }: ISendCallBackVariables) => {
  try {
    await axios.post(`${BACKEND_URL}/sendCallBack`, {
      phoneNumber,
    });
  } catch (err) {
    console.log(err);
  }
};
