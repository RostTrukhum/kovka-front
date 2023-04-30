import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import {
  IAddToCartVariables,
  ICreateCartResponce,
  ICreateCartVariables,
  IDeleteCartVariables,
  IDeleteProductCartVariables,
  IGetCartResponse,
  IGetCartVariables,
  IUpdateCartProductCountVariables,
} from './types';

export const getCart = async ({ cartId }: IGetCartVariables) => {
  try {
    const cart = await axios.get<IGetCartResponse>(`${BACKEND_URL}/getCart`, {
      params: {
        cartId,
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

export const createCart = async ({
  productId,
  productCount,
  productHeight,
  productWidth,
  doorClass,
  doorOpeningType,
  markUpInProcents,
  indoorPad,
  outsidePad,
}: ICreateCartVariables) => {
  try {
    const cart = await axios.post<ICreateCartVariables, ICreateCartResponce>(
      `${BACKEND_URL}/createCart`,
      {
        productId,
        productCount,
        productHeight,
        productWidth,
        class: doorClass,
        openingType: doorOpeningType,
        markUpInProcents,
        indoorPad,
        outsidePad,
      },
    );

    localStorage.setItem('cart_id', cart?.data._id);

    return cart?.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCart = async ({ cartId }: IDeleteCartVariables) => {
  try {
    const cart = await axios.post<IDeleteCartVariables>(`${BACKEND_URL}/deleteCart`, {
      cartId,
    });

    localStorage.removeItem('cart_id');

    return cart.data;
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async ({
  cartId,
  productCount,
  productId,
  productHeight,
  productWidth,
  doorClass,
  doorOpeningType,
  markUpInProcents,
  indoorPad,
  outsidePad,
}: IAddToCartVariables) => {
  try {
    const updatedCart = await axios.post<IAddToCartVariables, ICreateCartResponce>(
      `${BACKEND_URL}/addToCart`,
      {
        cartId,
        productCount,
        productId,
        productHeight,
        productWidth,
        class: doorClass,
        openingType: doorOpeningType,
        markUpInProcents,
        indoorPad,
        outsidePad,
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

export const deleteProductCart = async ({ cartId, cartProductId }: IDeleteProductCartVariables) => {
  try {
    const updatedCart = await axios.post<IDeleteProductCartVariables, ICreateCartResponce>(
      `${BACKEND_URL}/deleteProductCart`,
      {
        cartId,
        cartProductId,
      },
    );

    return updatedCart?.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateCartProductCount = async ({
  cartId,
  cartProductId,
  productCount,
  productHeight,
  productWidth,
}: IUpdateCartProductCountVariables) => {
  try {
    const updatedCart = await axios.post<IUpdateCartProductCountVariables, ICreateCartResponce>(
      `${BACKEND_URL}/updateCartProductCount`,
      {
        cartId,
        cartProductId,
        productCount,
        ...(productHeight && { productHeight }),
        ...(productWidth && { productWidth }),
      },
    );

    return updatedCart?.data;
  } catch (err) {
    console.log(err);
  }
};
