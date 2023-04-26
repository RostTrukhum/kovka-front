import React from 'react';

export interface IProductSpecificationTabsProps {
  activeIndoorPad: string;
  setActiveIndoorPad: React.Dispatch<React.SetStateAction<string>>;
  activeOutsidePad: string;
  setActiveOutsidePad: React.Dispatch<React.SetStateAction<string>>;
  isPolymer?: boolean;
}
