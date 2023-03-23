export interface ISizeInputsProps {
  width: number;
  height: number;
  setWidth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setHeight: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
