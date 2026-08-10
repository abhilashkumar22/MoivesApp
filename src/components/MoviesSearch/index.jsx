import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const MoviesSearch = ({searchInput, changeSearchInput, getMoviesWithInitialValue}) => (
  <div className="movies-search-container">
    <input
      type="search"
      className="search-input"
      value={searchInput}
      placeholder="Search"
      onChange={e => changeSearchInput(e.target.value)}
    />
    <button
      type="button"
      className="search-icon-button"
      data-testid="searchButton"
      onClick={getMoviesWithInitialValue}
    >
      <HiOutlineSearch color="#ffffff" size={18} />
    </button>
  </div>
)

export default MoviesSearch
