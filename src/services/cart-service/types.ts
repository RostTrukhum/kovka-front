import { IProduct } from '../admin-panel-service/types';

export interface IGetCartVariables {
  cartId: string;
}

export interface ICartProduct {
  product: {
    _id: string;
    title: string;
    price: number;
    img: string;
    type: string;
    subtype: string;
    createdAt: Date;
  };
  count: number;
  _id: string;
}

export interface IGetCartResponse {
  _id: string;
  products: ICartProduct[];
}

export interface ICreateCartVariables {
  productId: string;
  productCount?: number;
}

export interface ICreateCartResponce {
  data: {
    _id: string;
    products: ICartProduct[];
  };
}

export interface IAddToCartVariables {
  cartId: string;
  productCount?: number;
  productId: string;
}

export interface IDeleteProductCartVariables {
  cartId: string;
  cartProductId: string;
}

export interface IUpdateCartProductCountVariables {
  cartId: string;
  cartProductId: string;
  productCount: number;
}
