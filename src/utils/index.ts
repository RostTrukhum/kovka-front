import { ICalculateForegroundVariables } from './types';

export const calculateForegroundPrice = ({
  width,
  height,
  price,
}: ICalculateForegroundVariables) => {
  const widthInMeters = width / 1000;
  const heightInMeters = height / 1000;

  return Math.ceil(widthInMeters * heightInMeters * price);
};
