import { ICalculateForegroundVariables } from './types';

export const calculateForegroundPrice = ({
  width,
  height,
  price,
}: ICalculateForegroundVariables) => {
  const widthInMeters = width ? width / 1000 : 1;
  const heightInMeters = height ? height / 1000 : 1;

  return Math.ceil(widthInMeters * heightInMeters * price);
};
