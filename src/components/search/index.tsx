import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import './style.css';

export const Search = () => {
  return (
    <div className="search-wrapper">
      <input className="search-input" placeholder="Search here..." />
      <SearchIcon className="search-icon" />
    </div>
  );
};
