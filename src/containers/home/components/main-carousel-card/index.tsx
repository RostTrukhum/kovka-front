import { ReactComponent as MainRightArrow } from '../../../../assets/icons/right-arrow.svg';
import { MainButton } from '../../../../components/main-button';
import { IMainCarouselCardProps } from './types';

import './style.css';
import { useNavigate } from 'react-router-dom';

export const MainCarouselCard = ({ title, subtitle, productLink }: IMainCarouselCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(productLink);
  };

  return (
    <div className="main-carousel-card-wrapper">
      <div className="main-carousel-card-main-content-wrapper">
        <div className="main-carousel-card-content-wrapper">
          <span className="main-carousel-card-subtitle">{title}</span>
          <span className="main-carousel-card-title">{subtitle}</span>
          <MainButton
            onClick={handleClick}
            customWrapperClass="main-carousel-custom-button-wrapper button"
            text="Shop Now"
            icon={<MainRightArrow />}
          />
        </div>
      </div>
    </div>
  );
};
