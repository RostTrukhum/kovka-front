import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import {
  ICreateCartResponce,
  ICreateCartVariables,
  IGetCartResponse,
  IGetCartVariables,
  IUpdateCartVariables,
} from './types';

export const getCart = async ({ id }: IGetCartVariables) => {
  try {
    const cart = await axios.get<IGetCartResponse>(`${BACKEND_URL}/getCart`, {
      params: {
        id,
      },
    });

    if (!cart?.data?._id) {
      localStorage.removeItem('cart_id');
    }

    return cart?.data;
  } catch (err) {
    console.log(err);
  }
};

export const createCart = async ({ product }: ICreateCartVariables) => {
  try {
    const cart = await axios.post<ICreateCartVariables, ICreateCartResponce>(
      `${BACKEND_URL}/createCart`,
      {
        product,
      },
    );

    localStorage.setItem('cart_id', cart?.data._id);

    return cart?.data;
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async ({ product, id }: IUpdateCartVariables) => {
  try {
    const updatedCart = await axios.post<IUpdateCartVariables, ICreateCartResponce>(
      `${BACKEND_URL}/addToCart`,
      {
        id,
        product,
      },
    );

    if (!updatedCart?.data?._id) {
      localStorage.removeItem('cart_id');
    }

    return updatedCart?.data;
  } catch (err) {
    console.log(err);
  }
};
