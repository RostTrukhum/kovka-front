import { Footer } from '../../components/footer';
import { MainHeader } from '../../components/main-header';
import { MainCarousel } from './components/main-carousel';
import { MainProductCardList } from './components/main-product-cards-list';
import './style.css';

export const Home = () => {
  return (
    <>
      <MainHeader />
      <div className="home-content-wrapper">
        {/* <MainCarousel /> */}
        <MainProductCardList />
      </div>
      <Footer />
    </>
  );
};
