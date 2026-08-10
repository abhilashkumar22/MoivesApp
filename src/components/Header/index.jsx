import logo from '../../assets/logo.png'
import profile from '../../assets/profile.png'
import {useState} from 'react'
import {Link, useLocation} from 'react-router'
import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'

import MoviesSearch from '../MoviesSearch'

import './index.css'

const Header = ({
  searchInput = '',
  changeSearchInput = () => {},
  getMoviesWithInitialValue = () => {},
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const {pathname} = useLocation()
  const isSearchRoute = pathname === '/search'

  return (
    <nav className="header-container">
      <div className="header-top">
        <div className="header-left">
          <Link to="/">
            <img
              alt="website logo"
              className="header-logo"
              src={logo}
            />
          </Link>
          <ul className="nav-links-container">
            <li>
              <Link
                to="/"
                className={pathname === '/' ? 'nav-link active-link' : 'nav-link'}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/popular"
                className={
                  pathname === '/popular' ? 'nav-link active-link' : 'nav-link'
                }
              >
                Popular
              </Link>
            </li>
          </ul>
        </div>
        <div className="header-right">
          {isSearchRoute ? (
            <MoviesSearch
              searchInput={searchInput}
              changeSearchInput={changeSearchInput}
              getMoviesWithInitialValue={getMoviesWithInitialValue}
            />
          ) : (
            <Link to="/search">
              <button
                type="button"
                className="search-route-button"
                data-testid="searchButton"
              >
                <HiOutlineSearch color="#ffffff" size={18} />
              </button>
            </Link>
          )}
          <Link to="/account">
            <img
              alt="profile"
              className="profile-image"
              src={profile}
            />
          </Link>
          <button
            type="button"
            className="menu-button"
            onClick={() => setShowMenu(prev => !prev)}
          >
            {showMenu ? (
              <IoMdClose color="#ffffff" size={22} />
            ) : (
              <GiHamburgerMenu color="#ffffff" size={22} />
            )}
          </button>
        </div>
      </div>
      {showMenu && (
        <ul className="mobile-menu">
          <li>
            <Link
              to="/"
              className={pathname === '/' ? 'nav-link active-link' : 'nav-link'}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/popular"
              className={
                pathname === '/popular' ? 'nav-link active-link' : 'nav-link'
              }
            >
              Popular
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className={
                pathname === '/account' ? 'nav-link active-link' : 'nav-link'
              }
            >
              Account
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Header
