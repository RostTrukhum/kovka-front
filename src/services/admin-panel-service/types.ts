export interface IGetProductsVariables {
  filter?: {
    type?: string;
    subtype?: string;
    limit: number;
    skip: number;
  };
}

export interface IGetProductByIdVariables {
  id: string;
}

export interface IProduct {
  _id: string;
  title: string;
  price: number;
  img: string;
  type: string;
  subtype: string;
  createdAt: Date;
  description: string;
  height: number;
  width: number;
}

export interface IGetProductsResponce {
  data: {
    products: IProduct[];
    totalCount: number;
  };
}

export interface IGetProductByIdResponce {
  data: IProduct;
}

export interface IUpdateProductVariables {
  id: string;
  title: string;
  price: number;
  img: string;
  type: string;
  subtype: string;
  description: string;
  width: number;
  height: number;
}

export interface UploadProductImage {
  image: FormData;
}

export interface ICreateProductVariables {
  title: string;
  price: number;
  img: string;
  type: string;
  subtype: string;
  description: string;
  width: number;
  height: number;
}

export interface IDeleteProductVariables {
  id: string;
}

export interface IProductType {
  _id: string;
  title: string;
  type: string;
  subtypes: IProductSubtype[];
}

export interface IProductSubtype {
  _id: string;
  title: string;
  subtype: string;
}
