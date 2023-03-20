import React from 'react';

export interface IProductDescriptionModal {
  isVisible: boolean;
  onClose: () => void;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}
