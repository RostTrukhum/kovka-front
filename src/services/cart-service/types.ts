import { IProduct } from '../admin-panel-service/types';

export interface IGetCartVariables {
  id: string;
}

export interface ICartProduct {
  title: string;
  price: number;
  img: string;
  type: string;
  subtype: string;
  createdAt: Date;
  productId: string;
  count: number;
}

export interface ICreateCartResponceProduct extends ICartProduct {
  _id: string;
}

export interface IGetCartResponse {
  _id: string;
  amount: number;
  products: ICreateCartResponceProduct[];
}

export interface ICreateCartVariables {
  product: ICartProduct;
}

export interface ICreateCartResponce {
  data: {
    _id: string;
    amount: number;
    products: ICreateCartResponceProduct[];
  };
}

export interface IUpdateCartVariables {
  id: string;
  product: ICartProduct;
}
