export enum PRODUCT_TABS {
  ALL = 'all',
  FORGED_PRODUCTS = 'forgedProducts',
  DOORS = 'doors',
}

export interface IMainProductsTabsProps {
  activeTab: PRODUCT_TABS;
  handleActiveTab: (tab: PRODUCT_TABS) => () => void;
}
