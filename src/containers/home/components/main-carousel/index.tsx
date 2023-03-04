import { MainCarouselCard } from '../main-carousel-card';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import './style.css';

export const MainCarousel = () => {
  return (
    <div className="main-carousel-wrapper">
      <Carousel
        className="main-carousel-content"
        emulateTouch={true}
        showArrows={false}
        showStatus={false}
      >
        <MainCarouselCard
          title="Welcome to chairy"
          subtitle={'Best Furniture Collection for your interior.'}
          productLink="/product/123"
        />
        <MainCarouselCard
          title="Welcome to chairy"
          subtitle={'Best Furniture Collection for your interior.'}
          productLink="/product/123"
        />
        <MainCarouselCard
          title="Welcome to chairy"
          subtitle={'Best Furniture Collection for your interior.'}
          productLink="/product/123"
        />
        <MainCarouselCard
          title="Welcome to chairy"
          subtitle={'Best Furniture Collection for your interior.'}
          productLink="/product/123"
        />
        <MainCarouselCard
          title="Welcome to chairy"
          subtitle={'Best Furniture Collection for your interior.'}
          productLink="/product/123"
        />
        <MainCarouselCard
          title="Welcome to chairy"
          subtitle={'Best Furniture Collection for your interior.'}
          productLink="/product/123"
        />
        <MainCarouselCard
          title="Welcome to chairy"
          subtitle={'Best Furniture Collection for your interior.'}
          productLink="/product/123"
        />
      </Carousel>
    </div>
  );
};
