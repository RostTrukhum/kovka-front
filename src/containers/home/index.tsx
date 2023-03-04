import { CategoriesBar } from '../../components/categories-bar';
import { Navbar } from '../../components/navbar';
import { MainCarousel } from './components/main-carousel';
import { MainProductCard } from './components/main-product-card';
import { MainProductCardList } from './components/main-product-cards-list';
import './style.css';

export const Home = () => {
  return (
    <div>
      <Navbar />
      <CategoriesBar />
      <MainCarousel />
      <MainProductCardList />
    </div>
  );
};
