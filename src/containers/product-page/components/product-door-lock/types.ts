export interface IDoorLock {
  img: any;
  name: string;
  typeLock: string;
  typeMechanism?: string;
  coutOfBolts?: string;
  classOfSecurity?: string;
  reverseBar?: string;
  countOfScroll?: string;
  countOfCombinations?: string;
}

export interface IProductDoorLockProps {
  title: string;
  locks: IDoorLock[];
}
