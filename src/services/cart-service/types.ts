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
    width: number;
    height: number;
  };
  indoorPad?: string;
  outsidePad?: string;
  markUpInProcents?: number;
  class?: string;
  openingType?: string;
  count: number;
  width?: number;
  height?: number;
  _id: string;
}

export interface IGetCartResponse {
  _id: string;
  products: ICartProduct[];
}

export interface IDeleteCartVariables {
  cartId: string;
}
export interface ICreateCartVariables {
  productId: string;
  productCount?: number;
  productWidth?: number;
  productHeight?: number;
  doorClass?: string;
  doorOpeningType?: string;
  markUpInProcents?: number;
  indoorPad?: string;
  outsidePad?: string;
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
  productWidth?: number;
  productHeight?: number;
  doorClass?: string;
  doorOpeningType?: string;
  markUpInProcents?: number;
  indoorPad?: string;
  outsidePad?: string;
}

export interface IDeleteProductCartVariables {
  cartId: string;
  cartProductId: string;
}

export interface IUpdateCartProductCountVariables {
  cartId: string;
  cartProductId: string;
  productCount: number;
  productWidth?: number;
  productHeight?: number;
}
