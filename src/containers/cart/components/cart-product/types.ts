export interface ICartProductProps {
  id: string;
  title: string;
  price: number;
  img: string;
  type: string;
  subtype: string;
  productId: string;
  count: number;
  cartId: string;
  cartHeight?: number;
  cartWidth?: number;
  productHeight?: number;
  productWidth?: number;
  doorClass?: string;
  openingType?: string;
  markUpInProcents?: number;
  indoorPad?: string;
  outsidePad?: string;
}
