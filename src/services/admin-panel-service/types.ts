export interface IGetProductsVariables {
  filter?: {
    type?: string;
    subtype?: string;
    limit: number;
    skip: number;
  };
}

export interface IProduct {
  _id: string;
  title: string;
  price: number;
  img: string;
  type: string;
  subtype: string;
  createdAt: Date;
}

export interface IGetProductsResponce {
  data: {
    products: IProduct[];
    totalCount: number;
  };
}

export interface IUpdateProductVariables {
  id: string;
  title: string;
  price: number;
  img: string;
  type: string;
  subtype: string;
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
