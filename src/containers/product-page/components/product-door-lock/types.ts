export interface IProductDoorLockProps {
  title: string;
  lock: {
    img: string;
    name: string;
    typeLock: string;
    typeMechanism?: string;
    coutOfBolts?: number;
    classOfSecurity?: number;
    ReverseBar?: string;
    countOfScroll?: number;
    countOfCombinations?: string;
  };
}
