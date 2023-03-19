import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { ISendCallBackVariables, ISendCartCallBackVariables } from './types';

export const sendCallBack = async ({ phoneNumber }: ISendCallBackVariables) => {
  try {
    await axios.post(`${BACKEND_URL}/sendCallBack`, {
      phoneNumber,
    });
  } catch (err) {
    console.log(err);
  }
};

export const sendCartCallBack = async ({
  products,
  phoneNumber,
  totalPrice,
}: ISendCartCallBackVariables) => {
  try {
    await axios.post<ISendCartCallBackVariables>(`${BACKEND_URL}/sendCartCallBack`, {
      products,
      phoneNumber,
      totalPrice,
    });
  } catch (err) {
    console.log(err);
  }
};
